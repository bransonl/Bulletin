from marshmallow import fields

from bulletin.schemas.base import BaseSchema


class BoardSchema(BaseSchema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str()
    privacy = fields.Str(required=True)
    created_at = fields.DateTime(dump_to='createdAt')
    updated_at = fields.DateTime(dump_to='updatedAd')
    bullets = fields.Nested('BulletSchema', many=True)
