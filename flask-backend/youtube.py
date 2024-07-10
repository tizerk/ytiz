import yt_dlp
from yt_dlp.utils import download_range_func
import random


def remove_last_substring(string, substring):
    last_index = string.rfind(substring)
    if last_index != -1:
        return string[:last_index] + string[last_index + len(substring) :]
    else:
        return string


def get_info(link, startTime, endTime, format):
    randID = random.randint(0, 100)
    if (endTime - startTime) > 300:
        return ("", "", "", "", 0, 7, 0)
    ydl_opts = {
        "outtmpl": f"temporary_{randID}/%(title).150s.%(ext)s",
        "format": f"mp3/bestaudio/best",
        "noplaylist": True,
        "playlist_items": "0",
        "source_address": "0.0.0.0",
        "allowed_extractors": [
            "youtube",
            "soundcloud",
            "tiktok",
            "twitter",
            "bandcamp",
        ],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=False)
            if result["duration"] < startTime:
                return ("", "", "", "", 0, 6, 0)
            if result["duration"] < endTime:
                endTime = result["duration"]
            if startTime != 0 and endTime == 0:
                endTime = result["duration"]
            if startTime > endTime:
                return ("", "", "", "", 0, 6, 0)
            if result["duration"] > 3600:
                return ("", "", "", "", 0, 2, 0)
            thumbnail = result.get("thumbnail", "")
            title = result.get("title", "")
            author = result.get("uploader", "")
            filename = ""
            if "entries" in result:
                filename = ydl.prepare_filename(result) + ".zip"
            else:
                filename = ydl.prepare_filename(result) + f".{format}"
            if ".webm" in filename:
                filename = remove_last_substring(filename, ".webm")
            elif ".m4a" in filename:
                filename = remove_last_substring(filename, ".m4a")
            elif ".mp4" in filename:
                filename = remove_last_substring(filename, ".mp4")
            elif ".mp3" in filename:
                filename = remove_last_substring(filename, ".mp3")
            return thumbnail, title, author, filename, randID, 0, endTime
        except Exception as e:
            print(e)
            if "in your country" in str(e):
                return "", "", "", "", 0, 3, 0
            elif "Private video" in str(e):
                return "", "", "", "", 0, 4, 0
            elif "due to a copyright claim" in str(e):
                return "", "", "", "", 0, 5, 0
            return "", "", "", "", 0, 1, 0


def download_video(
    link, selectedQuality, metadata, randID, trim, startTime, endTime, format
):
    ydl_opts = {
        "outtmpl": f"temporary_{randID}/%(title).150s.%(ext)s",
        "format": f"mp3/bestaudio/best",
        "download_ranges": download_range_func(
            None, [(startTime if trim else 0, endTime if trim else 0)]
        ),
        "force_keyframes_at_cuts": True,
        "writethumbnail": True if metadata else False,
        "embedthumbnail": True if metadata else False,
        "postprocessors": [
            {
                "key": "FFmpegMetadata",
                "add_metadata": True if metadata else False,
            },
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": format,
                "preferredquality": selectedQuality,
            },
            {
                "key": "EmbedThumbnail",
            },
        ],
        "noplaylist": True,
        "playlist_items": "0",
        "source_address": "0.0.0.0",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download(link)
            return 0
        except Exception as e:
            print(e)
            if "in your country" in str(e):
                return 3
            elif "Private video" in str(e):
                return 4
            elif "due to a copyright claim" in str(e):
                return 5
            return 1
