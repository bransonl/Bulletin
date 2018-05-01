from marshmallow import fields

from bulletin.base.base_schema import BaseSchema


class ConfigSchema(BaseSchema):
    config = fields.Dict(keys=fields.Str(required=True),
                         data=fields.Dict(required=True))
