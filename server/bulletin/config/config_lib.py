from bulletin.auth.privacy_type import PrivacyType


def privacy_options():
    return {'values': [privacy_type.value for privacy_type in PrivacyType]}


CONFIGS = {
    'privacy': privacy_options,
}


def build_configs():
    return {'config': {name: func() for name, func in CONFIGS.items()}}


def build_single_config(name):
    return {'config': {name: CONFIGS[name]()}}
