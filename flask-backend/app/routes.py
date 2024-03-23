from flask import request, jsonify
from app import app
import os, shutil
import youtube


@app.route("/api/info", methods=["POST"])
def info():
    url = request.json["url"]
    startTime = request.json["startTime"]
    endTime = request.json["endTime"]
    format = request.json["format"]
    if len(url) < 1:
        return jsonify({"error": "Error: URL Not Found!"}, 404)
    else:
        thumbnail, title, author, filename, randID, err, endTime = youtube.get_info(
            url, startTime, endTime, format
        )
        if err == 0:
            return (
                jsonify(
                    {
                        "thumbnail": thumbnail,
                        "title": title,
                        "author": author,
                        "filename": filename,
                        "randID": randID,
                        "endTime": endTime,
                    }
                ),
                200,
            )
        else:
            if err == 1:
                return (
                    jsonify({"error": f"Error: This URL Is Not Supported: {url}"}),
                    406,
                )
            elif err == 2:
                return (
                    jsonify(
                        {"error": f"Error: Audio Over 1 Hour Is Not Supported: {url}"}
                    ),
                    406,
                )
            elif err == 3:
                return (
                    jsonify(
                        {
                            "error": f"Error: This URL has been blocked in the United States and cannot be downloaded with YTiz: {url}"
                        }
                    ),
                    406,
                )
            elif err == 4:
                return (jsonify({"error": f"Error: This URL is private: {url}"}), 406)
            elif err == 5:
                return (
                    jsonify(
                        {
                            "error": f"Error: This URL has been removed due to a copyright claim: {url}"
                        }
                    ),
                    406,
                )
            elif err == 6:
                return (
                    jsonify({"error": f"Error: Your specified timecodes are invalid!"}),
                    406,
                )
            elif err == 7:
                return (
                    jsonify(
                        {
                            "error": f"Error: Trimmed clips have a maximum duration of 5 minutes."
                        }
                    ),
                    406,
                )


@app.route("/api/download", methods=["POST"])
def download():
    url = request.json["url"]
    quality = request.json["quality"]
    metadata = request.json["metadata"]
    filename = request.json["filename"]
    randID = request.json["randID"]
    trim = request.json["trim"]
    startTime = request.json["startTime"]
    endTime = request.json["endTime"]
    format = request.json["format"]
    if len(url) < 1:
        return (jsonify({"error": "Error: URL Not Found!"}), 404)
    else:
        err = youtube.download_video(
            url, quality, metadata, randID, trim, startTime, endTime, format
        )
        if err == 0:
            file_path = os.path.join(os.path.dirname(__file__), os.pardir, filename)
            return (
                jsonify(
                    {"filename": filename, "filepath": file_path, "randID": randID}
                ),
                200,
            )
        else:
            if err == 1:
                return (
                    jsonify({"error": f"Error: This URL Is Not Supported: {url}"}),
                    406,
                )
            elif err == 2:
                return (
                    jsonify(
                        {"error": f"Error: Audio Over 1 Hour Is Not Supported: {url}"}
                    ),
                    406,
                )
            elif err == 3:
                return (
                    jsonify(
                        {
                            "error": f"Error: This URL has been blocked in the United States and cannot be downloaded with YTiz: {url}"
                        }
                    ),
                    406,
                )
            elif err == 4:
                return (jsonify({"error": f"Error: This URL is private: {url}"}), 406)
            elif err == 5:
                return (
                    jsonify(
                        {
                            "error": f"Error: This URL has been removed due to a copyright claim: {url}"
                        }
                    ),
                    406,
                )


@app.route("/api/file_send", methods=["POST"])
def file_send():
    file_path = request.json["filepath"]

    def download_audio():
        with open(file_path, "rb") as f:
            chunk_size = 1024
            while True:
                data = f.read(chunk_size)
                if not data:
                    break
                yield data

    return download_audio(), {"mimetype": "audio/mpeg"}


@app.route("/api/clear", methods=["POST"])
def clear():
    randID = request.json["randID"]
    if os.path.exists(f"temporary_{randID}/"):
        if os.path.isdir(f"temporary_{randID}/"):
            try:
                shutil.rmtree(f"temporary_{randID}/")
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
