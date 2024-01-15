from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    send_file,
    send_from_directory,
    flash,
    Response,
)
from app import app, os
import youtube


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
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
