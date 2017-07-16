import enum

from bulletin import db


class PrivacyType(enum.Enum):
    private = 'private',
    secret = 'secret',
    public = 'public'


class BoardModel(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    privacy = db.Column(db.Enum(PrivacyType), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    users = db.relationship('MembershipModel', backref='board', lazy=True)
    bullets = db.relationship('BulletModel', backref='board', lazy=True)
