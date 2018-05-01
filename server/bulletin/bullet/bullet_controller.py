from bulletin import app
from bulletin.auth import auth_decorator as auth
from bulletin.shared import validation_decorator as validation
from bulletin.bullet.bullet_model import Bullet
from bulletin.membership.membership_model import RoleType
from bulletin.base.base_schema import BaseSchema
from bulletin.bullet.bullet_schema import BulletSchema, CreateBulletSchema, \
    ModifyBulletSchema


@app.route('/bullets/<int:bullet_id>', methods=['GET'])
@auth.requires_authentication()
@validation.pass_board_by_bullet_id()
@auth.requires_board_access()
def get_bullet(bullet, board):
    return BulletSchema(wrap=True).to_json(bullet)


@app.route('/bullets', methods=['POST'])
@auth.requires_authentication()
@validation.unwrap_data(CreateBulletSchema)
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.contributor)
def create_bullet(data, board):
    bullet = Bullet.create(board_id=board.id,
                           parent_id=data.get('parent_id'),
                           bullet_type=data.get('bullet_type'),
                           label=data.get('label'),
                           description=data.get('description'),
                           value=data.get('value'))
    return BulletSchema(wrap=True).to_json(bullet)


@app.route('/bullets/<int:bullet_id>', methods=['PUT'])
@auth.requires_authentication()
@validation.pass_board_by_bullet_id()
@auth.requires_minimum_role(RoleType.contributor)
@validation.unwrap_data(ModifyBulletSchema)
def modify_bullet(data, bullet, board):
    modified = bullet.update(parent_id=data.get('parent_id'),
                             label=data.get('label'),
                             description=data.get('description'),
                             value=data.get('value'))
    return BulletSchema(wrap=True).to_json(modified)


@app.route('/bullets/<int:bullet_id>', methods=['DELETE'])
@auth.requires_authentication()
@validation.pass_board_by_bullet_id()
@auth.requires_minimum_role(RoleType.contributor)
def invalidate_bullet(bullet):
    bullet.invalidate()
    return BaseSchema(wrap=True).to_json({})
