import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("secret_key")
cors = CORS(app, resources={r"/*": {"origins": ["*"]}})

from app import routes
