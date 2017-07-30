from marshmallow import fields, Schema

from bulletin.schemas.base import BaseSchema


class CreateBulletSchema(Schema):
    board_id = fields.Int(required=True, load_from='boardId')
    parent_id = fields.Int(load_from='parentId')
    bullet_type = fields.Str(required=True, load_from='bulletType')
    label = fields.Str(required=True)
    description = fields.Str()
    value = fields.Int(required=True)


class ModifyBulletSchema(Schema):
    board_id = fields.Int(required=True, load_from='boardId')
    parent_id = fields.Int(load_from='parentId')
    label = fields.Str(required=True)
    description = fields.Str()
    value = fields.Int(required=True)


class BulletSchema(BaseSchema):
    id = fields.Int(required=True)
    board_id = fields.Int(required=True, dump_to='boardId')
    board = fields.Nested('BoardSchema', exclude=('bullets',))
    parent_id = fields.Int(allow_none=True, dump_to='parentId')
    root_id = fields.Int(allow_none=True, dump_to='rootId')
    previous_id = fields.Int(allow_none=True, dump_to='previousId')
    bullet_type = fields.Str(required=True, dump_to='bulletType')
    label = fields.Str(required=True)
    description = fields.Str()
    value = fields.Int(required=True)
    children = fields.Nested('self', many=True)
    created_at = fields.DateTime(dump_to='createdAt')
    updated_at = fields.DateTime(dump_to='updatedAt')
