from bulletin.errors.base import BadRequest, Forbidden


class MembershipErrorKey:
    MEMBERSHIP = 'membership'
    ROLE = 'role'


class MembershipErrorMessage:
    INVALID_ROLE = 'Invalid role type'
    INSUFFICIENT_PRIVILEGES = 'You do not have sufficient privileges to ' \
                              'perform this action.'
    NO_BOARD_ACCESS = 'You do not have access to this board.'
    NOT_MEMBER = 'User with id {0} is not a member of board with id {1}.'
    EXISTING_MEMBERSHIP = 'User with id {0} is already a member of board ' \
                          'with id {1}.'


class NotMemberOfBoard(BadRequest):
    def __init__(self, user_id, board_id):
        self.message = MembershipErrorMessage.NOT_MEMBER.format(
            user_id, board_id
        )


class ExistingMembership(BadRequest):
    def __init__(self, user_id, board_id):
        self.message = MembershipErrorMessage.EXISTING_MEMBERSHIP.format(
            user_id, board_id
        )


class NoBoardAccess(Forbidden):
    def __init__(self):
        self.message = MembershipErrorMessage.NO_BOARD_ACCESS


class InsufficientPrivileges(Forbidden):
    def __init__(self):
        self.message = MembershipErrorMessage.INSUFFICIENT_PRIVILEGES
