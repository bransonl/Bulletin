from marshmallow import fields, Schema

from bulletin.schemas.base import BaseSchema
from bulletin.types.role import RoleType


def _validate_role(role):
    return role in RoleType.__members__


class UpdateMembershipSchema(Schema):
    role = fields.Str(required=True, validate=_validate_role)


class MembershipSchema(BaseSchema):
    board_id = fields.Int(required=True, dump_to='boardId')
    user_id = fields.Int(required=True, dump_to='userId')
    username = fields.Str(required=True)
    role = fields.Str(required=True)
