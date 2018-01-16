from bulletin import app
from bulletin.schemas.config import ConfigSchema
from bulletin.libs.config import build_configs, build_single_config


@app.route('/configs', methods=['GET'])
def get_configs():
    return ConfigSchema(wrap=True).to_json(build_configs())


@app.route('/configs/privacy', methods=['GET'])
def get_privacy_config():
    return ConfigSchema(wrap=True).to_json(build_single_config('privacy'))
