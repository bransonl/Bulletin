from flask import jsonify
from marshmallow import fields, Schema

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


class ErrorSchema(Schema):
  error_message = fields.Str()
  error_data = fields.Raw()


class Error(Exception):
  def __init__(self, error_data=None):
    self.error_data = error_data or {}

  def to_json(self):
    res = jsonify(ErrorSchema().dump(self).data)
    res.status_code = self.status_code
    return res


class BadRequest(Error):
  status_code = StatusCode.BAD_REQUEST
  error_message = ErrorMessage.BAD_REQUEST


class Unauthorized(Error):
  status_code = StatusCode.UNAUTHORIZED
  error_message = ErrorMessage.UNAUTHORIZED


class Forbidden(Error):
  status_code = StatusCode.FORBIDDEN
  error_message = ErrorMessage.FORBIDDEN


class NotFound(Error):
  status_code = StatusCode.NOT_FOUND
  error_message = ErrorMessage.NOT_FOUND

  def __init__(self, error_data={}):
    super(self.__class__, self).__init__(error_data)
    self.status_code = StatusCode.NOT_FOUND
    error_message = ErrorMessage.NOT_FOUND


class MethodNotAllowed(Error):
  status_code = StatusCode.METHOD_NOT_ALLOWED
  error_message = ErrorMessage.METHOD_NOT_ALLOWED


@app.errorhandler(404)
def page_not_found(err):
  return NotFound().to_json()


@app.errorhandler(405)
def method_not_allowed(err):
  return MethodNotAllowed().to_json()


@app.errorhandler(Error)
def error_handler(err):
  return err.to_json()
