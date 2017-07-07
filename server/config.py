import os


class BaseConfig(object):
  DEBUG = os.environ['DEBUG']
  DB_USER = os.environ['DB_USER']
  DB_PASS = os.environ['DB_PASS']
  DB_SERVICE = os.environ['DB_SERVICE']
  DB_PORT = os.environ['DB_PORT']
  DB_NAME = os.environ['DB_NAME']
  SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
    DB_USER, DB_PASS, DB_SERVICE, DB_PORT, DB_NAME)
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  JWT_SECRET = 'jwtsecret'
  ERROR_404_HELP = False
