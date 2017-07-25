import base64
import hashlib

import bcrypt

from bulletin import app, db
from bulletin.common import validation
from bulletin.errors import base
from bulletin.libs import jwttoken
from bulletin.models.user import User
from bulletin.schemas.auth import AccessTokenSchema, AuthErrorMessage, \
    LoginSchema, PasswordSchema, SignupSchema, UsernameSchema


def _encode_password(password):
    return base64.b64encode(hashlib.sha256(password.encode('utf-8')).digest())


@app.route('/username', methods=['POST'])
@validation.unwrap_data(UsernameSchema)
def validate_username(data):
    return UsernameSchema(wrap=True).to_json({
        'username': data.get('username')
    })


@app.route('/password', methods=['POST'])
@validation.unwrap_data(PasswordSchema)
def validate_password(data):
    return PasswordSchema(wrap=True).to_json({'password': ''})


@app.route('/login', methods=['POST'])
@validation.unwrap_data(LoginSchema)
def login(data):
    username, password = data.get('username'), data.get('password')
    user = User.query.filter_by(username=username).first()

    if user is None or not bcrypt.checkpw(_encode_password(password),
                                          user.password.encode('utf-8')):
        raise base.Unauthorized(base.construct_errors(
            'password', AuthErrorMessage.INCORRECT_PASSWORD))

    return AccessTokenSchema(wrap=True).to_json({
        'token': jwttoken.encode(user),
        'account_id': user.id,
        'username': user.username
    })


@app.route('/signup', methods=['POST'])
@validation.unwrap_data(SignupSchema)
def signup(data):
    username, password = data.get('username'), data.get('password')
    hashed = bcrypt.hashpw(_encode_password(password), bcrypt.gensalt())
    user = User(username=username, password=hashed.decode('utf-8'))
    db.session.add(user)
    db.session.commit()
    return AccessTokenSchema(wrap=True).to_json({
        'token': jwttoken.encode(user),
        'account_id': user.id,
        'username': user.username
    })

