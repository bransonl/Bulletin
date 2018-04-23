import datetime
import jwt

from config import BaseConfig


def encode(user):
    iat = datetime.datetime.utcnow()
    return jwt.encode({
        'sub': user.id,
        'iat': iat,
        'exp': iat + datetime.timedelta(days=365)
    }, BaseConfig.JWT_SECRET, algorithm='HS256')


def decode(token):
    try:
        user = jwt.decode(token, BaseConfig.JWT_SECRET, algorithm=['HS256'])
    except jwt.InvalidTokenError as e:
        print('JWT Decode Error: %s' % e)
        return None
    return user
