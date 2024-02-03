from flask import (
    request,
    send_file,
    jsonify,
)
from app import app
import os, shutil
import youtube


@app.route("/api/download", methods=["POST"])
def download():
    url = request.json["url"]
    if len(url) < 1:
        return jsonify({"error": "Error: URL Not Found!"}), 404
    else:
        filename, err = youtube.download_video(url)
        if err != 1:
            file_path = os.path.join(os.path.dirname(__file__), os.pardir, filename)
            return jsonify({"filename": filename, "filepath": file_path}), 200
        else:
            return jsonify({"error": f"Error: This URL Is Not Supported: {url}"}), 406


@app.route("/api/file_send", methods=["POST"])
def file_send():
    file_path = request.json["filepath"]
    return send_file(file_path, as_attachment=True)


@app.route("/api/clear", methods=["POST"])
def clear():
    if os.path.exists("temporary/"):
        if os.path.isdir("temporary/"):
            try:
                shutil.rmtree("temporary/")
                return jsonify({"error": ""}), 200
            except OSError as error:
                print(f"Error deleting directory: {error}")
                return (
                    jsonify({"error": f"Error: Failed to Delete Temporary Directory"}),
                    500,
                )


@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"test": "Successful GET Request!"}), 200
