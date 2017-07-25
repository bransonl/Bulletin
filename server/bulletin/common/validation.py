from functools import wraps

from flask import request

from bulletin.errors.common import InvalidData


def unwrap_data(schema):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            data, validation_errors = schema().load(request.get_json() or {})
            if validation_errors:
                raise InvalidData(errors=validation_errors)
            kwargs['data'] = data
            return f(*args, **kwargs)
        return wrapped
    return wrapper
