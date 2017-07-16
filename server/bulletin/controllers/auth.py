import base64
import hashlib

import bcrypt
from flask import request

from bulletin import app, db
from bulletin.common import errors
from bulletin.libs import jwttoken
from bulletin.schemas.auth import AccessTokenSchema, AuthErrorMessage, \
    LoginSchema, PasswordSchema, SignupSchema, UsernameSchema
from bulletin.models.user import UserModel


def _encode_password(password):
    return base64.b64encode(hashlib.sha256(password.encode('utf-8')).digest())


@app.route('/username', methods=['POST'])
def validate_username():
    data, validation_errors = UsernameSchema().load(request.get_json() or {})
    if validation_errors:
        raise errors.InvalidData(errors=validation_errors)
    return UsernameSchema(wrap=True).to_json({
        'username': data.get('username')
    })


@app.route('/password', methods=['POST'])
def validate_password():
    data, validation_errors = PasswordSchema().load(request.get_json() or {})
    if validation_errors:
        raise errors.InvalidData(errors=validation_errors)
    return PasswordSchema(wrap=True).to_json({'password': ''})


@app.route('/login', methods=['POST'])
def login():
    data, validation_errors = LoginSchema().load(request.get_json() or {})
    if validation_errors:
        raise errors.InvalidData(errors=validation_errors)
    username, password = data.get('username'), data.get('password')
    user = UserModel.query.filter_by(username=username).first()

    if user is None or not bcrypt.checkpw(_encode_password(password),
                                          user.password.encode('utf-8')):
        raise errors.Unauthorized(errors.construct_errors(
            'password', AuthErrorMessage.INCORRECT_PASSWORD))

    return AccessTokenSchema(wrap=True).to_json({
        'token': jwttoken.encode(user),
        'account_id': user.id,
        'username': user.username
    })


@app.route('/signup', methods=['POST'])
def signup():
    data, validation_errors = SignupSchema().load(request.get_json() or {})
    if validation_errors:
        raise errors.InvalidData(errors=validation_errors)
    username, password = data.get('username'), data.get('password')
    hashed = bcrypt.hashpw(_encode_password(password), bcrypt.gensalt())
    user = UserModel(username=username, password=hashed.decode('utf-8'))
    db.session.add(user)
    db.session.commit()
    return AccessTokenSchema(wrap=True).to_json({
        'token': jwttoken.encode(user),
        'account_id': user.id,
        'username': user.username
    })

