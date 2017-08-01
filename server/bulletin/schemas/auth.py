from marshmallow import fields, Schema, ValidationError

from bulletin.errors.auth import AuthErrorMessage
from bulletin.models.user import User
from bulletin.schemas.base import BaseSchema


class AuthRequirement:
    MIN_USERNAME_LENGTH = 5
    MIN_PASSWORD_LENGTH = 8


def _validate_username(username):
    if username is None or len(username) < AuthRequirement.MIN_USERNAME_LENGTH:
        raise ValidationError(AuthErrorMessage.USERNAME_TOO_SHORT)
    existing_user = User.query.filter_by(username=username).first()
    if existing_user is not None:
        raise ValidationError(AuthErrorMessage.USERNAME_TAKEN)
    return True


def _validate_password(password):
    if password is None or len(password) < AuthRequirement.MIN_PASSWORD_LENGTH:
        raise ValidationError(AuthErrorMessage.PASSWORD_TOO_SHORT)
    return True


class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class SignupSchema(Schema):
    username = fields.Str(required=True, validate=_validate_username)
    password = fields.Str(required=True, validate=_validate_password)


class UsernameSchema(BaseSchema):
    username = fields.Str(required=True, validate=_validate_username)


class PasswordSchema(BaseSchema):
    password = fields.Str(required=True, validate=_validate_password)


class AccessTokenSchema(BaseSchema):
    token = fields.Str(required=True)
    user_id = fields.Int(required=True, dump_to='userId')
    username = fields.Str(required=True)
