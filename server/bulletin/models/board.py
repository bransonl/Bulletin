from bulletin import db
from bulletin.types.privacy import PrivacyType


class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False, default='')
    privacy = db.Column(db.Enum(PrivacyType), nullable=False)
    valid = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    member_roles = db.relationship('Membership',
                                   back_populates='board', lazy=True)
    bullets = db.relationship('Bullet', back_populates='board', lazy=True)

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
