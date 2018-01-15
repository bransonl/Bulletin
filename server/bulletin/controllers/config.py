from bulletin import app
from bulletin.decorators import auth
from bulletin.schemas.config import ConfigItemSchema
from bulletin.libs.config import build_configs, build_single_config


@app.route('/configs', methods=['GET'])
def get_configs():
    return ConfigItemSchema(wrap=True).to_json(build_configs(), many=True)


@app.route('/configs/privacy', methods=['GET'])
def get_privacy_config():
    return ConfigItemSchema(wrap=True).to_json(build_single_config('privacy'))
