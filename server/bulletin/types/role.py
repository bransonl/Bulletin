from enum import Enum


# pylint: disable=too-few-public-methods

class RoleType(Enum):
    viewer = 1
    contributor = 2
    admin = 3
    owner = 4

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        raise NotImplementedError()

    def __le__(self, other):
        if self.__class__ is other.__class__:
            return self.value <= other.value
        raise NotImplementedError()

    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return self.value >= other.value
        raise NotImplementedError()

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return self.value > other.value
        raise NotImplementedError()

# pylint: enable=too-few-public-methods
