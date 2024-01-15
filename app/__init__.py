import os
from flask import Flask
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("secret_key")

from app import routes
