import enum

from bulletin import db


class RoleType(enum.Enum):
  admin       = 'admin'
  contributor = 'contributor'
  viewer      = 'viewer'


class Membership(db.Model):
  board_id = db.Column(db.Integer, db.ForeignKey('board.id'), primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
  role_id = db.Column(db.Enum(RoleType), nullable=False)
  created = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now())
  updated = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now(), server_onupdate=db.func.now())
