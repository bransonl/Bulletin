from bulletin import app, db
from bulletin.decorators import auth, validation
from bulletin.errors.membership import NotMemberOfBoard, \
    InsufficientPrivileges, ExistingMembership
from bulletin.models.membership import Membership
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.board import BoardSchema
from bulletin.schemas.membership import MembershipSchema, \
    UpdateMembershipSchema
from bulletin.types.role import RoleType


@app.route('/memberships/<int:board_id>/users', methods=['GET'])
@auth.requires_authentication()
@validation.pass_board_by_id()
@auth.requires_board_access()
def get_board_roles(board):
    users = map(lambda member_role: member_role.user, board.member_roles)
    return MembershipSchema(wrap=True).to_json(users, many=True)


@app.route('/memberships/<int:user_id>/boards', methods=['GET'])
@auth.requires_authentication()
def get_user_boards(user):
    boards = map(lambda membership: membership.board, user.memberships)
    return BoardSchema(wrap=True).to_json(boards, many=True)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['GET'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@auth.requires_board_access()
def get_user_role_in_board(user, target_user, board):
    membership = Membership.query \
        .filter_by(user_id=target_user.id) \
        .filter_by(board_id=board.id) \
        .first()
    if membership is None:
        return BaseSchema(wrap=True).to_json({})
    membership.username = target_user.username
    return MembershipSchema(wrap=True).to_json(membership)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['POST'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@validation.unwrap_data(UpdateMembershipSchema)
def add_user_role_to_board(user, target_user, board, data):
    membership = Membership.query \
        .filter_by(user_id=target_user.id) \
        .filter_by(board_id=board.id) \
        .first()
    if membership is not None:
        raise ExistingMembership(target_user.id, board.id)
    new_role = data.get('role')
    if user.role <= new_role:
        raise InsufficientPrivileges()
    new_membership = Membership(board_id=board.id,
                                user_id=target_user.id,
                                role=new_role)
    db.session.add(new_membership)
    db.session.commit()
    new_membership.username = target_user.username
    return MembershipSchema(wrap=True).to_json(membership)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['PUT'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@validation.unwrap_data(UpdateMembershipSchema)
def modify_user_role_in_board(user, target_user, board, data):
    membership = Membership.query \
        .filter_by(user_id=target_user.id) \
        .filter_by(board_id=board.id) \
        .first()
    if membership is None:
        raise NotMemberOfBoard(target_user.id, board.id)
    new_role = data.get('role')
    if user.role <= new_role:
        raise InsufficientPrivileges()
    membership.role = new_role
    db.session.commit()
    membership.username = target_user.username
    return MembershipSchema(wrap=True).to_json(membership)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['DELETE'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.admin)
def remove_user_from_board(user, target_user, board):
    membership = Membership.query \
        .filter_by(user_id=target_user.id) \
        .filter_by(board_id=board.id) \
        .first()
    if membership is None:
        raise NotMemberOfBoard(target_user.id, board.id)
    if user.role <= target_user.role:
        raise InsufficientPrivileges()
    db.session.delete(membership)
    db.session.commit()
    return BaseSchema(wrap=True).to_json({})
