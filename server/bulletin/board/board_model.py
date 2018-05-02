from sqlalchemy import orm

from bulletin import db
from bulletin.base.base_model import Base
from bulletin.auth.privacy_type import PrivacyType
from bulletin.shared.common_lib import filter_valid
from bulletin.bullet.bullet_lib import build_bullet_tree


class Board(Base):
    __tablename__ = 'board'

    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False, default='')
    privacy = db.Column(db.Enum(PrivacyType), nullable=False)
    valid = db.Column(db.Boolean, nullable=False, default=True)

    member_roles = db.relationship('Membership',
                                   back_populates='board', lazy=True)
    bullets = db.relationship('Bullet', back_populates='board', lazy=True)

    @orm.reconstructor
    def init_on_load(self):
        self.bullet_tree = build_bullet_tree(filter_valid(self.bullets))

    @staticmethod
    def get_by_id(board_id):
        return Board.query.get(board_id)

    @staticmethod
    def create(name, description, privacy):
        board = Board(name=name,
                      description=description,
                      privacy=privacy,
                      valid=True)
        db.session.add(board)
        db.session.commit()
        return board

    def update(self, name=None, description=None, privacy=None):
        if name is not None:
            self.name = name
        if description is not None:
            self.description = description
        if privacy is not None:
            self.privacy = privacy
        db.session.commit()

    def invalidate(self):
        self.valid = False
        db.session.commit()