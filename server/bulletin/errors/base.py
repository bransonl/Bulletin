from flask import jsonify, request

from bulletin import app
from bulletin.schemas.error import ErrorSchema, MethodNotAllowedSchema


class StatusCode:
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405
    INTERNAL_SERVER = 500


class ErrorMessage:
    BAD_REQUEST = 'Bad request'
    UNAUTHORIZED = 'Unauthorized'
    FORBIDDEN = 'Forbidden'
    NOT_FOUND = 'Not found'
    METHOD_NOT_ALLOWED = 'Method not allowed'
    INTERNAL_SERVER = 'Internal server'
    INVALID_DATA = 'Invalid data',


class Resource:
    USER = 'User'
    BOARD = 'Board'
    BULLET = 'Bullet'


class ResourceIdName:
    USERNAME = 'username'
    ID = 'id'


# Base Error class to provide to_json method

class Error(Exception):
    def to_json(self):
        return jsonify(ErrorSchema().dump(self).data)


# General Error classes to define code and message

class BadRequest(Error):
    code = StatusCode.BAD_REQUEST
    message = ErrorMessage.BAD_REQUEST

    def __init__(self, errors=None):
        self.errors = errors or []


class Unauthorized(Error):
    code = StatusCode.UNAUTHORIZED
    message = ErrorMessage.UNAUTHORIZED

    def __init__(self, errors=None):
        self.errors = errors or []


class Forbidden(Error):
    code = StatusCode.FORBIDDEN
    message = ErrorMessage.FORBIDDEN

    def __init__(self, errors=None):
        self.errors = errors or []


class NotFound(Error):
    code = StatusCode.NOT_FOUND
    message = ErrorMessage.NOT_FOUND

    @staticmethod
    def build_message(resource, id_name, resource_id):
        return '{0} with {1} \'{2}\' not found' \
            .format(resource, id_name, resource_id)

    def __init__(self, errors=None):
        self.errors = errors or []


class MethodNotAllowed(Error):
    code = StatusCode.METHOD_NOT_ALLOWED
    message = ErrorMessage.METHOD_NOT_ALLOWED

    def __init__(self, allowed_methods=None):
        self.allowed_methods = allowed_methods or []

    def to_json(self):
        return jsonify(MethodNotAllowedSchema().dump(self).data)


class InternalServer(Error):
    code = StatusCode.INTERNAL_SERVER
    message = ErrorMessage.INTERNAL_SERVER

    def __init__(self, errors=None):
        self.errors = errors or []


@app.errorhandler(404)
def page_not_found():
    return NotFound().to_json()


@app.errorhandler(405)
def method_not_allowed(err):
    return MethodNotAllowed(allowed_methods=err.valid_methods).to_json()


@app.errorhandler(Error)
def error_handler(err):
    return err.to_json()
