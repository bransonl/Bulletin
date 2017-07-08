from bulletin import db


class UserModel(db.Model):
  __tablename__ = 'user'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  salt = db.Column(db.String(80), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now(), server_onupdate=db.func.now())
  
  boards = db.relationship('Membership', backref='user', lazy=True)
