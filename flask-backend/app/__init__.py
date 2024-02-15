import os, shutil
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("secret_key")
cors = CORS(
    app,
    resources={r"/api/*": {"origin": f"{os.getenv('origin')}"}},
)
with app.app_context():
    for x in os.listdir("./"):
        if x.startswith("temporary_"):
            try:
                shutil.rmtree(x)
            except OSError as error:
                print(f"Error deleting temporary directory: {error}")


from app import routes
