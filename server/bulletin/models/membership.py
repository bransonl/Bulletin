import enum

from bulletin import db


class RoleType(enum.Enum):
    viewer = 1
    contributor = 2
    admin = 3
    owner = 4


class Membership(db.Model):
    __tablename__ = 'membership'

    board_id = db.Column(db.Integer, db.ForeignKey('board.id'),
                         primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    role = db.Column(db.Enum(RoleType), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())
