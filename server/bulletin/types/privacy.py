from enum import Enum


# pylint: disable=too-few-public-methods

class PrivacyType(Enum):
    private = {
        'label': 'Private',
        'value': 'private',
    }
    secret = {
        'label': 'Secret',
        'value': 'secret',
    }
    public = {
        'label': 'Public',
        'value': 'public',
    }

# pylint: enable=too-few-public-methods
