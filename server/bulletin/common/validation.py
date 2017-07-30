from functools import wraps

from flask import request

from bulletin.errors.board import BoardNotFound
from bulletin.errors.bullet import BulletNotFound, InvalidBullet, \
    OrphanedBullet
from bulletin.errors.common import InvalidData
from bulletin.models.board import Board
from bulletin.models.bullet import Bullet


def unwrap_data(schema):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            data, validation_errors = schema().load(request.get_json() or {})
            if validation_errors:
                raise InvalidData(errors=validation_errors)
            kwargs['data'] = data
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def pass_board_by_id():
    def wrapper(f):
        @wraps(f)
        def wrapped(board_id=None, data=None, *args, **kwargs):
            board = Board.query.get(board_id or data.get('board_id'))
            if board is None:
                raise BoardNotFound(board_id)
            kwargs['board'] = board
            if data is not None:
                kwargs['data'] = data
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def pass_board_by_bullet_id():
    def wrapper(f):
        @wraps(f)
        def wrapped(bullet_id=None, data=None, *args, **kwargs):
            bullet = Bullet.query.get(bullet_id or data.get('bullet_id'))
            if bullet is None:
                raise BulletNotFound(bullet_id)
            elif bullet.valid is False:
                raise InvalidBullet(bullet_id)
            board = bullet.board
            if board is None:
                raise OrphanedBullet(bullet_id)
            kwargs['board'] = board
            kwargs['bullet'] = bullet
            if data is not None:
                kwargs['data'] = data
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def pass_bullet_by_id():
    def wrapper(f):
        @wraps(f)
        def wrapped(bullet_id=None, data=None, *args, **kwargs):
            bullet = Bullet.query.get(bullet_id or data.get('bullet_id'))
            if bullet is None:
                raise BulletNotFound(bullet_id)
            elif bullet.valid is False:
                raise InvalidBullet(bullet_id)
            kwargs['bullet'] = bullet
            if data is not None:
                kwargs['data'] = data
            return f(*args, **kwargs)
        return wrapped
    return wrapper
