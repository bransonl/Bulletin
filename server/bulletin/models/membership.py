from bulletin import db
from bulletin.types.role import RoleType


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

    board = db.relationship('Board', back_populates='member_roles', lazy=True)
    user = db.relationship('User', back_populates='memberships', lazy=True)
