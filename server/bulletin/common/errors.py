from flask import jsonify

from bulletin import app
from bulletin.schemas.error import ErrorSchema


class StatusCode:
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405


class ErrorMessage:
    BAD_REQUEST = 'Bad request'
    UNAUTHORIZED = 'Unauthorized'
    FORBIDDEN = 'Forbidden'
    NOT_FOUND = 'Not found'
    METHOD_NOT_ALLOWED = 'Method not allowed'
    INVALID_DATA = 'Invalid data'


class Resource:
    USER = 'User'
    BOARD = 'Board'
    BULLET = 'Bullet'


class ResourceIdName:
    USERNAME = 'username'
    ID = 'id'


class Error(Exception):
    def __init__(self, errors=None):
        self.errors = errors

    def to_json(self):
        return jsonify(ErrorSchema().dump(self).data)


class BadRequest(Error):
    code = StatusCode.BAD_REQUEST

    def __init__(self, message=ErrorMessage.BAD_REQUEST, errors=None):
        self.message = message
        self.errors = errors


class Unauthorized(Error):
    code = StatusCode.UNAUTHORIZED
    message = ErrorMessage.UNAUTHORIZED

    def __init__(self, errors=None):
        self.errors = errors


class Forbidden(Error):
    code = StatusCode.FORBIDDEN
    message = ErrorMessage.FORBIDDEN


class NotFound(Error):
    code = StatusCode.NOT_FOUND
    message = ErrorMessage.NOT_FOUND

    @staticmethod
    def build_message(resource, id_name, resource_id):
        return '{0} with {1} \'{2}\' not found'\
            .format(resource, id_name, resource_id)

    @staticmethod
    def build_error(resource, message):
        return {
            resource.lower(): [message]
        }

    def __init__(self, errors=None):
        self.errors = errors


class MethodNotAllowed(Error):
    code = StatusCode.METHOD_NOT_ALLOWED
    message = ErrorMessage.METHOD_NOT_ALLOWED


class InvalidData(BadRequest):
    message = ErrorMessage.INVALID_DATA

    def __init__(self, errors=None):
        self.errors = errors


class UserNotFound(NotFound):
    def __init__(self, username):
        resource, id_name = Resource.USER, ResourceIdName.USERNAME
        self.errors = NotFound.build_error(
            resource, NotFound.build_message(resource, id_name, username))


class BoardNotFound(NotFound):
    def __init__(self, board_id):
        resource, id_name = Resource.BOARD, ResourceIdName.ID
        self.errors = NotFound.build_error(
            resource, NotFound.build_message(resource, id_name, board_id)
        )


class BulletNotFound(NotFound):
    def __init__(self, bullet_id):
        resource, id_name = Resource.BULLET, ResourceIdName.ID
        self.errors = NotFound.build_error(
            resource, NotFound.build_message(resource, id_name, bullet_id)
        )


def construct_errors(label, message, existing_errors=None):
    if existing_errors is not None and existing_errors.get(label) is not None:
        new_errors = existing_errors.copy()
        new_errors[label].append(message)
        return new_errors
    return {
        label: [message]
    }


@app.errorhandler(404)
def page_not_found():
    return NotFound().to_json()


@app.errorhandler(405)
def method_not_allowed(_):
    return MethodNotAllowed().to_json()


@app.errorhandler(Error)
def error_handler(err):
    return err.to_json()
