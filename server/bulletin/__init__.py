from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import BaseConfig


app = Flask(__name__)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

CORS(app)

from bulletin.auth import auth_controller
from bulletin.board import board_model, board_controller
from bulletin.bullet import bullet_model, bullet_controller
from bulletin.config import config_controller
from bulletin.membership import membership_model, membership_controller
from bulletin.user import user_model, user_controller
