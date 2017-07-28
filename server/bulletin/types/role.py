import enum


class RoleType(enum.Enum):
    viewer = 1
    contributor = 2
    admin = 3
    owner = 4

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        return NotImplemented
