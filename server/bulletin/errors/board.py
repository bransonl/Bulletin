from bulletin.errors.base import NotFound, Resource, ResourceIdName


class BoardRequirement:
    MIN_NAME_LENGTH = 5


class BoardErrorMessage:
    NAME_TOO_SHORT = 'Board name must be at least {0} characters long.' \
        .format(BoardRequirement.MIN_NAME_LENGTH)
    INVALID_PRIVACY = 'Invalid privacy type.'


class BoardNotFound(NotFound):
    def __init__(self, board_id):
        resource, id_name = Resource.BOARD, ResourceIdName.ID
        self.message = NotFound.build_message(resource, id_name, board_id)
