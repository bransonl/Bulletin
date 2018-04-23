from flask import jsonify
from marshmallow import Schema, post_dump


class BaseSchema(Schema):
    def __init__(self, wrap=False, *args, **kwargs):
        self.__wrap = wrap
        super().__init__(*args, **kwargs)

    @post_dump(pass_many=True)
    def wrap(self, data, _):
        if self.__wrap:
            return {
                'data': data
            }
        return data

    def to_json(self, obj, many=False):
        return jsonify(self.dump(obj, many).data)
