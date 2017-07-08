from marshmallow import fields

from bulletin.schemas.base import BaseSchema


class UserSchema(BaseSchema):
    id = fields.Int(required=True)
    username = fields.Str(required=True)
    created_at = fields.DateTime(dump_to='createdAt')
    updated_at = fields.DateTime(dump_to='updatedAt')
    boards = fields.Nested('BoardSchema', many=True)
