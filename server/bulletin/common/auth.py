from flask import request
from functools import wraps

from bulletin import db
from bulletin.common import errors
from bulletin.models.board import Board, PrivacyType
from bulletin.models.membership import Membership
from bulletin.models.user import User
from bulletin.libs import jwttoken
from bulletin.schemas.membership import MembershipErrorMessage


def _get_auth_user():
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


def _has_enough_privileges(user_id, board_id, role):
    membership = Membership.query \
        .filter_by(user_id=user_id, board_id=board_id)
    if membership is None:
        return False
    elif membership.role < role:
        return False
    return True


def _has_access_to_board(user_id, board_id):
    board, membership = db.session.query(Board, Membership) \
        .outerjoin(Membership, Board.id == Membership.board_id) \
        .filter(Board.id == board_id) \
        .filter(Membership.user_id == user_id) \
        .first()
    # board not found
    if board is None:
        raise errors.BoardNotFound(board_id)
    # board secret and no membership
    elif board.privacy is PrivacyType.secret and membership is None:
        raise errors.BoardNotFound(board_id)
    # board private and no membership
    elif board.privacy is PrivacyType.private and membership is None:
        return None
    return board


def requires_auth():
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            user = _get_auth_user()
            if user is None:
                raise errors.Unauthorized()
            kwargs['user'] = user
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_minimum_role(role):
    def wrapper(f):
        @wraps(f)
        def wrapped(board_id, *args, **kwargs):
            user = _get_auth_user()
            if user is None:
                raise errors.Unauthorized()
            elif not _has_enough_privileges(user.id, board_id, role):
                raise errors.Forbidden({
                    'role': MembershipErrorMessage.INSUFFICIENT_PRIVILEGES
                })
            kwargs['board_id'] = board_id
            return f(*args, **kwargs)
        return wrapped
    return wrapper


def requires_board_access():
    def wrapper(f):
        @wraps(f)
        def wrapped(board_id, *args, **kwargs):
            user = _get_auth_user()
            if user is None:
                raise errors.Unauthorized()
            board = _has_access_to_board(user.id, board_id)
            if board is None:
                raise errors.Forbidden({
                    'board': MembershipErrorMessage.NO_BOARD_ACCESS
                })
            kwargs['board'] = board
            return f(*args, **kwargs)
        return wrapped
    return wrapper
