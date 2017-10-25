from marshmallow import fields, post_dump, Schema


class ErrorSchema(Schema):
    code = fields.Int(required=True)
    message = fields.Str(required=True)
    errors = fields.Dict()

    @post_dump()
    def wrap(self, error):
        return {
            'error': error
        }


class MethodNotAllowedSchema(ErrorSchema):
    allowed_methods = fields.List(fields.Str(),
                                  required=True,
                                  dump_to='allowedMethods')
