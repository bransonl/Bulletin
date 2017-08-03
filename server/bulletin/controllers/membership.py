from bulletin import app
from bulletin.decorators import auth, validation
from bulletin.errors.membership import NotMemberOfBoard, \
    InsufficientPrivileges, ExistingMembership
from bulletin.models.membership import Membership
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.board import BoardSchema
from bulletin.schemas.membership import MembershipSchema, \
    UpdateMembershipSchema
from bulletin.types.role import RoleType


@app.route('/memberships/boards/<int:board_id>/users', methods=['GET'])
@auth.requires_authentication()
@validation.pass_board_by_id()
@auth.requires_board_access()
def get_board_roles(board):
    users = map(lambda member_role: member_role.user, board.member_roles)
    return MembershipSchema(wrap=True).to_json(users, many=True)


@app.route('/memberships/users/<int:user_id>/boards', methods=['GET'])
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
    membership = Membership.get_user_role(target_user.id, board.id)
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
    membership = Membership.get_user_role(target_user.id, board.id)
    if membership is not None:
        raise ExistingMembership(target_user.id, board.id)
    role = data.get('role')
    if user.role <= role:
        raise InsufficientPrivileges()
    new_membership = Membership.create(target_user.id, board.id, role)
    new_membership.username = target_user.username
    return MembershipSchema(wrap=True).to_json(membership)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['PUT'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@validation.unwrap_data(UpdateMembershipSchema)
def modify_user_role_in_board(user, target_user, board, data):
    membership = Membership.get_user_role(target_user.id, board.id)
    if membership is None:
        raise NotMemberOfBoard(target_user.id, board.id)
    role = data.get('role')
    if user.role <= role:
        raise InsufficientPrivileges()
    membership.update(role)
    membership.username = target_user.username
    return MembershipSchema(wrap=True).to_json(membership)


@app.route('/memberships/boards/<int:board_id>/users/<int:user_id>',
           methods=['DELETE'])
@auth.requires_authentication()
@validation.pass_target_user_by_id()
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.admin)
def remove_user_from_board(user, target_user, board):
    membership = Membership.get_user_role(target_user.id, board.id)
    if membership is None:
        raise NotMemberOfBoard(target_user.id, board.id)
    if user.role <= target_user.role:
        raise InsufficientPrivileges()
    membership.delete()
    return BaseSchema(wrap=True).to_json({})
