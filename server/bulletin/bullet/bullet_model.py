from bulletin import db
from bulletin.bullet.bullet_type import BulletType


class Bullet(db.Model):
    __tablename__ = 'bullet'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)
    root_id = db.Column(db.Integer, nullable=True)
    previous_id = db.Column(db.Integer, nullable=True)
    bullet_type = db.Column(db.Enum(BulletType), nullable=False)
    label = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False, default='')
    value = db.Column(db.Integer, nullable=False)
    valid = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    board = db.relationship('Board', back_populates='bullets', lazy=True)

    @staticmethod
    def get_by_id(bullet_id):
        return Bullet.query.get(bullet_id)

    @staticmethod
    def create(board_id, parent_id, bullet_type, label, description, value):
        bullet = Bullet(board_id=board_id,
                        parent_id=parent_id,
                        root_id=None,
                        previous_id=None,
                        bullet_type=bullet_type,
                        label=label,
                        description=description,
                        value=value)
        db.session.add(bullet)
        db.session.commit()
        return bullet

    def update(self, parent_id=None, label=None, description=None, value=None):
        changed = False
        bullet = Bullet(board_id=self.board_id,
                        parent_id=self.parent_id,
                        root_id=self.root_id,
                        previous_id=self.id,
                        bullet_type=self.bullet_type,
                        label=self.label,
                        description=self.description,
                        value=self.value)
        if parent_id is not None and parent_id != bullet.parent_id:
            bullet.parent_id = parent_id
            changed = True
        if label is not None and label != bullet.label:
            bullet.label = label
            changed = True
        if description is not None and description != bullet.description:
            bullet.description = description
            changed = True
        if value is not None and value != bullet.value:
            bullet.value = value
            changed = True
        if changed:
            self.valid = False
            db.session.add(bullet)
            db.session.flush()
            children = Bullet.query.filter_by(parent_id=self.id).all()
            for child in children:
                child.parent_id = bullet.id
            db.session.commit()
            return bullet
        return None

    def invalidate(self):
        self.valid = False
        db.session.commit()
