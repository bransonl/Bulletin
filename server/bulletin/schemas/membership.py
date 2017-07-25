from marshmallow import fields

from bulletin.schemas.base import BaseSchema


class MembershipErrorMessage:
    INSUFFICIENT_PRIVILEGES = 'You have insufficient privileges to ' \
                              'perform this action.'
    NO_BOARD_ACCESS = 'You do not have access to this board.'


class MembershipSchema(BaseSchema):
    board_id = fields.Int(required=True, dump_to='boardId')
    user_id = fields.Int(required=True, dump_to='userId')
    role = fields.Str(required=True)
