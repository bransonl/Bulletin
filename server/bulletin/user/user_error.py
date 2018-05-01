from bulletin.base.base_error import Forbidden, NotFound, Unauthorized, \
    Resource, ResourceIdName


class UserRequirement:
    MIN_USERNAME_LENGTH = 5
    MIN_PASSWORD_LENGTH = 8


class UserErrorMessage:
    USERNAME_TOO_SHORT = 'Username must be at least {0} characters long.' \
        .format(UserRequirement.MIN_USERNAME_LENGTH)
    PASSWORD_TOO_SHORT = 'Password must be at least {0} characters long.' \
        .format(UserRequirement.MIN_PASSWORD_LENGTH)
    USERNAME_TAKEN = 'Username is already taken.'
    INCORRECT_PASSWORD = 'No user found with this ' \
                         'username and password combination'
    NOT_AUTHENTICATED_AS = 'You must be authenticated as the requested user ' \
                           'to perform this action.'


class UserNotFound(NotFound):
    def __init__(self, username):
        resource, id_name = Resource.USER, ResourceIdName.USERNAME
        self.message = NotFound.build_message(resource, id_name, username)


class NotAuthenticatedAs(Forbidden):
    def __init__(self):
        self.message = UserErrorMessage.NOT_AUTHENTICATED_AS


class IncorrectPassword(Unauthorized):
    def __init__(self):
        self.message = UserErrorMessage.INCORRECT_PASSWORD
