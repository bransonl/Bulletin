from bulletin.errors.base import Unauthorized
from bulletin.schemas.auth import AuthRequirement


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
        self.message = AuthErrorMessage.INCORRECT_PASSWORD
