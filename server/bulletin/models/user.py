from bulletin import db


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  salt = db.Column(db.String(80), nullable=False)
  created = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now())
  updated = db.Column(db.DateTime, nullable=False,
    server_default=db.func.now(), server_onupdate=db.func.now())
  
  boards = db.relationship('Membership', backref='user', lazy=True)
