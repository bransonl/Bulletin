from bulletin.errors.base import BadRequest, ErrorMessage


class InvalidData(BadRequest):
    message = ErrorMessage.INVALID_DATA

    def __init__(self, errors=None):
        self.errors = errors
