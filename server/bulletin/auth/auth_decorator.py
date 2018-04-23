from functools import wraps

from flask import request

from bulletin.shared import jwttoken_lib as jwttoken
from bulletin.shared.base_error import Unauthorized
from bulletin.board.board_error import BoardNotFound
from bulletin.membership.membership_error import InsufficientPrivileges, NoBoardAccess
from bulletin.board.board_model import PrivacyType
from bulletin.membership.membership_model import Membership
from bulletin.user.user_model import User


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
            membership = Membership.get_user_role(user.id, board.id)
            if membership is None or membership.role < role:
                raise InsufficientPrivileges()
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_board_access():
    def wrapper(f):
        @wraps(f)
        def wrapped(user, board, *args, **kwargs):
            membership = Membership.get_user_role(board.id, user.id)
            # board secret and no membership
            if board.privacy is PrivacyType.secret and membership is None:
                raise BoardNotFound(board.id)
            # board private and no membership
            elif board.privacy is PrivacyType.private and membership is None:
                raise NoBoardAccess()
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper
