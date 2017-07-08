from flask import jsonify
from marshmallow import Schema


class BaseSchema(Schema):
    def to_json(self, obj, many=False):
        return jsonify(self.dump(obj, many).data)
