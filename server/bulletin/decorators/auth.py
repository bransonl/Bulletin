from functools import wraps

from flask import request

from bulletin.libs import jwttoken

from bulletin.errors.base import Unauthorized
from bulletin.errors.board import BoardNotFound
from bulletin.errors.membership import InsufficientPrivileges, NoBoardAccess
from bulletin.models.board import PrivacyType
from bulletin.models.membership import Membership
from bulletin.models.user import User


def _get_authenticated_user():
    authorization = request.headers.get('Authorization')
    if authorization is None:
        return None
    if not authorization.startswith('Bearer '):
        return None
    token = jwttoken.decode(authorization[len('Bearer '):])
    if token is None or token.get('sub') is None:
        return None
    user = User.query.get(token.get('sub'))
    return user


def _has_enough_privileges(board_id, user_id, role):
    membership = Membership.get_user_role(board_id=board_id, user_id=user_id)
    if membership is None:
        return False
    return membership.role >= role


def _verify_board_access(board, user_id):
    membership = Membership.get_user_role(board.id, user_id)
    # board secret and no membership
    if board.privacy is PrivacyType.secret and membership is None:
        raise BoardNotFound(board.id)
    # board private and no membership
    elif board.privacy is PrivacyType.private and membership is None:
        raise NoBoardAccess()


def requires_authentication():
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            user = _get_authenticated_user()
            if user is None:
                raise Unauthorized()
            kwargs['user'] = user
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_minimum_role(role):
    def wrapper(f):
        @wraps(f)
        def wrapped(user, board, *args, **kwargs):
            if not _has_enough_privileges(board.id, user.id, role):
                raise InsufficientPrivileges()
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_board_access():
    def wrapper(f):
        @wraps(f)
        def wrapped(user, board, *args, **kwargs):
            _verify_board_access(board, user.id)
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper
