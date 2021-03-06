from bulletin import app
from bulletin.decorators import auth, validation
from bulletin.schemas.user import PasswordSchema, UserSchema


@app.route('/users/<int:user_id>', methods=['GET'])
@validation.pass_target_user_by_id()
def get_user(target_user):
    return UserSchema(wrap=True).to_json(target_user)


@app.route('/users/<int:user_id>', methods=['PUT'])
@auth.requires_authentication()
@validation.pass_target_user_by_id(authenticated_as=True)
@validation.unwrap_data(PasswordSchema)
def modify_password(user, target_user, data):
    user.update(data.get('password'))
    return UserSchema(wrap=True).to_json(user)
