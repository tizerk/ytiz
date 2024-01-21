from flask import (
    render_template,
    request,
    send_file,
    flash,
)
from app import app
import os, shutil
import youtube


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        if os.path.exists("temporary/"):
            if os.path.isdir("temporary/"):
                try:
                    shutil.rmtree("temporary/")
                except OSError as error:
                    print(f"Error deleting directory: {error}")
        url = request.form.get("url")
        if len(url) < 1:
            flash("Error: No URL Found!")
        else:
            filename, err = youtube.download_video(url)
            if err != 1:
                file_path = os.path.join(os.path.dirname(__file__), os.pardir, filename)
                return send_file(file_path, as_attachment=True)
            else:
                flash(f"Error: This URL Is Not Supported: {url}")
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html")
