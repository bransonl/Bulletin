from marshmallow import fields, Schema

from bulletin.schemas.base import BaseSchema


class ConfigItemSchema(BaseSchema):
    config_type = fields.Str(required=True, dump_to='configType')
    data = fields.Dict(required=True)
