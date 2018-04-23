from bulletin import db
from bulletin.auth.role_type import RoleType


class Membership(db.Model):
    __tablename__ = 'membership'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'),
                         primary_key=True)
    role = db.Column(db.Enum(RoleType), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    board = db.relationship('Board', back_populates='member_roles', lazy=True)
    user = db.relationship('User', back_populates='memberships', lazy=True)

    @staticmethod
    def get_board_members(board_id):
        return Membership.query.filter_by(board_id=board_id).all()

    @staticmethod
    def get_user_role(user_id, board_id):
        return Membership.query \
            .filter_by(board_id=board_id) \
            .filter_by(user_id=user_id) \
            .first()

    @staticmethod
    def create(user_id, board_id, role):
        membership = Membership(board_id=board_id, user_id=user_id, role=role)
        db.session.add(membership)
        db.session.commit()
        return membership

    def update(self, role):
        self.role = role
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
