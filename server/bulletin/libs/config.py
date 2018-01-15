from bulletin.types.privacy import PrivacyType


def privacy_options():
    return {'values': [privacy_type.value for privacy_type in PrivacyType]}


CONFIGS = {
    'privacy': privacy_options,
}


def build_configs():
    return [{
        'config_type': name,
        'data': value_func()
    } for name, value_func in CONFIGS.items()]


def build_single_config(name):
    return {'config_type': name, 'data': CONFIGS[name]()}
