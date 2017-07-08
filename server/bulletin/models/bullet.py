import enum

from bulletin import db


class BulletType(enum.Enum):
    group = 'group'
    bullet = 'bullet'


class BulletModel(db.Model):
    __tablename__ = 'bullet'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)
    root_id = db.Column(db.Integer, nullable=False)
    previous_id = db.Column(db.Integer, nullable=True)
    bullet_type = db.Column(db.Enum(BulletType), nullable=False)
    label = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())
