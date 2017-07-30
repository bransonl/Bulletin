from bulletin.errors.base import NotFound, Resource, ResourceIdName, \
    InternalServer, construct_errors, BadRequest


class BulletErrorKey:
    BULLET = 'bullet'


class BulletErrorMessage:
    INVALID_BULLET = 'Bullet with id {0} is not valid.'
    REPEATED_BULLET_ID = 'Multiple Bullets found with id {0}.'
    ORPHANED_BULLET = 'Bullet with id {0} has been orphaned.'


class BulletNotFound(NotFound):
    def __init__(self, bullet_id):
        resource, id_name = Resource.BULLET, ResourceIdName.ID
        self.errors = NotFound.build_error(
            resource, NotFound.build_message(resource, id_name, bullet_id)
        )


class InvalidBullet(BadRequest):
    def __init__(self, bullet_id):
        self.errors = construct_errors(
            BulletErrorKey.BULLET,
            BulletErrorMessage.INVALID_BULLET.format(bullet_id)
        )


class RepeatedBulletId(InternalServer):
    def __init__(self, bullet_id):
        self.errors = construct_errors(
            BulletErrorKey.BULLET,
            BulletErrorMessage.REPEATED_BULLET_ID.format(bullet_id)
        )


class OrphanedBullet(InternalServer):
    def __init__(self, bullet_id):
        self.errors = construct_errors(
            BulletErrorKey.BULLET,
            BulletErrorMessage.ORPHANED_BULLET.format(bullet_id)
        )
