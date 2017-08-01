from bulletin import db
from bulletin.types.privacy import PrivacyType


class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    privacy = db.Column(db.Enum(PrivacyType), nullable=False)
    valid = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    member_roles = db.relationship('Membership',
                                   back_populates='board', lazy=True)
    bullets = db.relationship('Bullet', back_populates='board', lazy=True)
