from bulletin import app, db
from bulletin.common import auth, validation
from bulletin.libs.bullet import propogate_bullet_id_update
from bulletin.models.bullet import Bullet
from bulletin.models.membership import RoleType
from bulletin.schemas.base import BaseSchema
from bulletin.schemas.bullet import BulletSchema, CreateBulletSchema, \
    ModifyBulletSchema


@app.route('/bullets/<int:bullet_id>', methods=['GET'])
@auth.requires_authentication()
@validation.pass_bullet_by_id()
@auth.requires_bullet_access()
def get_bullet(bullet):
    return BulletSchema(wrap=True).to_json(bullet)


@app.route('/bullets', methods=['POST'])
@auth.requires_authentication()
@validation.unwrap_data(CreateBulletSchema)
@validation.pass_board_by_id()
@auth.requires_minimum_role(RoleType.contributor)
def create_bullet(data, board):
    bullet = Bullet(board_id=board.id,
                    parent_id=data.get('parent_id'),
                    bullet_type=data.get('bullet_type'),
                    label=data.get('label'),
                    description=data.get('description'),
                    value=data.get('value'))
    db.session.add(bullet)
    db.session.flush()
    bullet.root_id = bullet.id
    db.session.commit()
    return BulletSchema(wrap=True).to_json(bullet)


@app.route('/bullets/<int:bullet_id>', methods=['PUT'])
@auth.requires_authentication()
@validation.pass_board_by_bullet_id()
@auth.requires_minimum_role(RoleType.contributor)
@validation.unwrap_data(ModifyBulletSchema)
def modify_bullet(data, bullet, board):
    bullet.valid = False
    modify = Bullet(board_id=board.id,
                    parent_id=data.get('parent_id') or bullet.parent_id,
                    root_id=bullet.root_id or bullet.id,
                    previous_id=bullet.id,
                    bullet_type=bullet.bullet_type,
                    label=data.get('label') or bullet.label,
                    description=data.get('description') or bullet.description,
                    value=data.get('value') or bullet.value)
    db.session.add(modify)
    propogate_bullet_id_update(bullet.id, modify.id)
    db.session.commit()
    return BulletSchema(wrap=True).to_json(modify)


@app.route('/bullets/<int:bullet_id>', methods=['DELETE'])
@auth.requires_authentication()
@validation.pass_board_by_bullet_id()
@auth.requires_minimum_role(RoleType.contributor)
def invalidate_bullet(bullet):
    bullet.valid = False
    db.session.commit()
    return BaseSchema(wrap=True).to_json({})
