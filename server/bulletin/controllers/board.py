from bulletin import app, db
from bulletin.common import auth, validation
from bulletin.errors import base
from bulletin.errors.board import BoardNotFound
from bulletin.models.board import Board
from bulletin.models.membership import Membership, RoleType
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.board import BoardSchema, CreateBoardSchema, \
    ModifyBoardSchema
from bulletin.schemas.membership import MembershipErrorMessage


@app.route('/boards', methods=['GET'])
@auth.requires_auth()
def get_boards(user):
    return BoardSchema(wrap=True).to_json(
        list(map(lambda membership: membership.board, user.boards)), many=True)


@app.route('/boards/<int:board_id>', methods=['GET'])
@auth.requires_board_access()
def get_board(board):
    return BoardSchema(wrap=True).to_json(board)


@app.route('/boards', methods=['POST'])
@auth.requires_auth()
@validation.unwrap_data(CreateBoardSchema)
def create_board(user, data):
    board = Board(name=data.get('name'), privacy=data.get('privacy'))
    db.session.add(board)
    db.session.flush()
    membership = Membership(
        user_id=user.id, board_id=board.id, role=RoleType.owner)
    db.session.add(membership)
    db.session.commit()
    return BoardSchema(wrap=True).to_json(board)


@app.route('/boards/<int:board_id>', methods=['PUT'])
@auth.requires_minimum_role(RoleType.admin)
@validation.unwrap_data(ModifyBoardSchema)
def modify_board(board_id, user, data):
    board = Board.query.get(board_id)
    if board is None:
        raise BoardNotFound(board_id)
    board.name = data.get('name') or board.name
    board.description = data.get('description') or board.description
    board.privacy = data.get('privacy') or board.privacy
    db.session.commit()
    bullets = [] # TODO: do bullets here
    return BoardSchema(wrap=True).to_json({
        'id': board.id,
        'name': board.name,
        'description': board.description,
        'privacy': board.privacy,
        'updated_at': board.updated_at,
        'bullets': bullets
    })


@app.route('/boards/<int:board_id>', methods=['DELETE'])
@auth.requires_minimum_role(RoleType.admin)
def delete_board(board_id, user):
    board = db.session.query(Board)
    if board is None:
        raise BoardNotFound(board_id)

    membership = Membership.query \
        .filter_by(board_id=board.id, user_id=user.id)
    if membership.role is not RoleType.admin:
        raise base.Forbidden(errors=base.construct_errors(
            'role', MembershipErrorMessage.INSUFFICIENT_PRIVILEGES
        ))

    db.session.delete(board)
    db.session.commit()
    return BaseSchema(wrap=True).to_json({})
