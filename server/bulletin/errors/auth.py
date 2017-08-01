from bulletin.errors.base import Unauthorized, construct_errors
from bulletin.schemas.auth import AuthRequirement


class AuthErrorKey:
    PASSWORD = 'password'


class AuthErrorMessage:
    USERNAME_TOO_SHORT = 'Username must be at least {0} characters long.' \
        .format(AuthRequirement.MIN_USERNAME_LENGTH)
    PASSWORD_TOO_SHORT = 'Password must be at least {0} characters long.' \
        .format(AuthRequirement.MIN_PASSWORD_LENGTH)
    USERNAME_TAKEN = 'Username is already taken.'
    INCORRECT_PASSWORD = 'No user found with this ' \
                         'username and password combination'


class IncorrectPassword(Unauthorized):
    def __init__(self):
        self.errors = construct_errors(AuthErrorKey.PASSWORD,
                                       AuthErrorMessage.INCORRECT_PASSWORD)
