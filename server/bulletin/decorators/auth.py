from functools import wraps

from flask import request

from bulletin.libs import jwttoken

from bulletin.errors.base import Forbidden, Unauthorized
from bulletin.errors.board import BoardNotFound
from bulletin.errors.bullet import OrphanedBullet
from bulletin.errors.membership import MembershipErrorMessage
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


def _has_enough_privileges(user_id, board, role):
    membership = Membership.query \
        .filter_by(user_id=user_id, board_id=board.id)\
        .first()
    if membership is None:
        return False
    elif membership.role < role:
        return False
    return True


def _verify_board_access(user_id, board):
    membership = Membership.query \
        .filter(Membership.board_id == board.id) \
        .filter(Membership.user_id == user_id) \
        .first()
    # board secret and no membership
    if board.privacy is PrivacyType.secret and membership is None:
        raise BoardNotFound(board.id)
    # board private and no membership
    elif board.privacy is PrivacyType.private and membership is None:
        raise Forbidden({'role': MembershipErrorMessage.NO_BOARD_ACCESS})


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
            if not _has_enough_privileges(user.id, board, role):
                raise Forbidden({
                    'role': MembershipErrorMessage.INSUFFICIENT_PRIVILEGES
                })
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_board_access():
    def wrapper(f):
        @wraps(f)
        def wrapped(user, board, *args, **kwargs):
            _verify_board_access(user.id, board)
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper
