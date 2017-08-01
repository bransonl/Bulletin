from bulletin import app, db
from bulletin.decorators import auth, validation
from bulletin.libs.bullet import build_bullet_tree
from bulletin.models.board import Board
from bulletin.models.membership import Membership, RoleType
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.board import BoardSchema, CreateBoardSchema, \
    ModifyBoardSchema


@app.route('/boards', methods=['GET'])
@auth.requires_authentication()
def get_boards(user):
    return BoardSchema(wrap=True).to_json(
        list(map(lambda membership: membership.board, user.boards)), many=True)


@app.route('/boards/<int:board_id>', methods=['GET'])
@auth.requires_authentication()
@validation.pass_board_by_id()
@auth.requires_board_access()
def get_board(board):
    bullets = list(filter(lambda bullet: bullet.valid is True,
                          board.bullets))
    board.bullets = build_bullet_tree(bullets)
    return BoardSchema(wrap=True).to_json(board)


@app.route('/boards', methods=['POST'])
@auth.requires_authentication()
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
@auth.requires_authentication()
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.admin)
@validation.unwrap_data(ModifyBoardSchema)
def modify_board(board, data):
    board.name = data.get('name') or board.name
    board.description = data.get('description') or board.description
    board.privacy = data.get('privacy') or board.privacy
    db.session.commit()
    bullets = filter(lambda bullet: bullet.valid is True, board.bullets) # TODO: do bullets here
    return BoardSchema(wrap=True).to_json({
        'id': board.id,
        'name': board.name,
        'description': board.description,
        'privacy': board.privacy,
        'updated_at': board.updated_at,
        'bullets': bullets
    })


@app.route('/boards/<int:board_id>', methods=['DELETE'])
@auth.requires_authentication()
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.admin)
def invalidate_board(board):
    board.valid = False
    db.session.commit()
    return BaseSchema(wrap=True).to_json({})
