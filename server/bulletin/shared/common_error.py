from bulletin.shared.base_error import BadRequest, ErrorMessage


class InvalidData(BadRequest):
    message = ErrorMessage.INVALID_DATA

    def __init__(self, errors=None):
        self.errors = errors or []
