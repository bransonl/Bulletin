from bulletin.errors.base import NotFound, Resource, ResourceIdName


class BoardNotFound(NotFound):
    def __init__(self, board_id):
        resource, id_name = Resource.BOARD, ResourceIdName.ID
        self.errors = NotFound.build_error(
            resource, NotFound.build_message(resource, id_name, board_id)
        )
