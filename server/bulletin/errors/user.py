from bulletin.errors.base import NotFound, Resource, ResourceIdName


class UserErrorMessage:
    NOT_AUTHENTICATED_AS = 'You must be authenticated as this user.'


class UserNotFound(NotFound):
    def __init__(self, username):
        resource, id_name = Resource.USER, ResourceIdName.USERNAME
        self.message = NotFound.build_message(resource, id_name, username)
