from marshmallow import fields

from bulletin.schemas.base import BaseSchema


class BulletSchema(BaseSchema):
    id = fields.Int(required=True)
    board_id = fields.Int(required=True, dump_to='boardId')
    board = fields.Nested('BoardSchema', exclude=('bullets',))
    parent_id = fields.Int(required=True, dump_to='parentId')
    root_id = fields.Int(required=True, dump_to='rootId')
    root = fields.Nested('self', only='id')
    previous_id = fields.Int(dump_to='previousId')
    bullet_type = fields.Str(dump_to='bulletType')
    label = fields.Str(required=True)
    description = fields.Str()
    value = fields.Int()
    created_at = fields.DateTime(dump_to='createdAt')
    updated_at = fields.DateTime(dump_to='updatedAt')
