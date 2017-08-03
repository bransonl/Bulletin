from marshmallow import fields, Schema, ValidationError

from bulletin.errors.board import BoardErrorMessage, BoardRequirement
from bulletin.models.board import PrivacyType
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.bullet import BulletSchema


def _validate_board_name(name):
    if name and len(name) < BoardRequirement.MIN_NAME_LENGTH:
        raise ValidationError(BoardErrorMessage.NAME_TOO_SHORT)


def _validate_board_privacy(privacy):
    if privacy and privacy not in PrivacyType.__members__:
        raise ValidationError(BoardErrorMessage.INVALID_PRIVACY)


class CreateBoardSchema(Schema):
    name = fields.Str(required=True, validate=_validate_board_name)
    description = fields.Str()
    privacy = fields.Str(required=True, validate=_validate_board_privacy)


class ModifyBoardSchema(Schema):
    name = fields.Str(validate=_validate_board_name)
    description = fields.Str()
    privacy = fields.Str()


class BoardSchema(BaseSchema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str()
    privacy = fields.Str(required=True)
    updated_at = fields.DateTime(dump_to='updatedAt')
    bullets = fields.Nested(BulletSchema, many=True)
