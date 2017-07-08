from marshmallow import fields

from bulletin.schemas.base import BaseSchema


class MembershipSchema(BaseSchema):
    board_id = fields.Int(required=True, dump_to='boardId')
    user_id = fields.Int(required=True, dump_to='userId')
    role = fields.Str(required=True)
