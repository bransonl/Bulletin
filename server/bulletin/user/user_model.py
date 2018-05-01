from bulletin import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(),
                           server_onupdate=db.func.now())

    memberships = db.relationship('Membership',
                                  back_populates='user', lazy=True)

    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def get_by_username(username):
        return User.query.filter_by(username=username).first()

    @staticmethod
    def create(username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return user

    def update(self, password):
        self.password = password
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
