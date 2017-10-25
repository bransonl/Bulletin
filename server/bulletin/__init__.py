from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import BaseConfig


app = Flask(__name__)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

CORS(app)

from bulletin.models import *
from bulletin.controllers import *
