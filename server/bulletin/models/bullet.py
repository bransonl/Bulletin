from bulletin import db
from bulletin.types.bullet import BulletType


class Bullet(db.Model):
    __tablename__ = 'bullet'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)
    root_id = db.Column(db.Integer, nullable=True)
    previous_id = db.Column(db.Integer, nullable=True)
    bullet_type = db.Column(db.Enum(BulletType), nullable=False)
    label = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    value = db.Column(db.Integer)
    valid = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    board = db.relationship('Board', back_populates='bullets', lazy=True)
