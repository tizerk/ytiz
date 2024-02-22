import yt_dlp
import random


def remove_last_substring(string, substring):
    last_index = string.rfind(substring)
    if last_index != -1:
        return string[:last_index] + string[last_index + len(substring) :]
    else:
        return string


def get_info(link):
    randID = random.randint(0, 100)
    ydl_opts = {
        "outtmpl": f"temporary_{randID}/%(title)s.%(ext)s",
        "format": f"mp3/bestaudio/best",
        "noplaylist": True,
        "playlist_items": "0",
        "source_address": "0.0.0.0",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=False)
            if result["duration"] > 3600:
                return (
                    "",
                    "",
                    "",
                    "",
                    0,
                    2,
                )
            thumbnail = result.get("thumbnail", "")
            title = result.get("title", "")
            author = result.get("uploader", "")
            filename = ""
            if "entries" in result:
                filename = ydl.prepare_filename(result) + ".zip"
            else:
                filename = ydl.prepare_filename(result) + ".mp3"
            if ".webm" in filename:
                filename = remove_last_substring(filename, ".webm")
            elif ".m4a" in filename:
                filename = remove_last_substring(filename, ".m4a")
            elif ".NA" in filename:
                filename = remove_last_substring(filename, ".NA")
            elif ".mp3" in filename:
                filename = remove_last_substring(filename, ".mp3")
            return thumbnail, title, author, filename, randID, 0
        except Exception as e:
            print(e)
            if "in your country" in str(e):
                return "", "", "", 0, 3
            elif "Private video" in str(e):
                return "", "", "", 0, 4
            elif "due to a copyright claim" in str(e):
                return "", "", "", 0, 5
            return "", "", "", 0, 1


def download_video(link, selectedQuality, metadata, randID):
    ydl_opts = {
        "outtmpl": f"temporary_{randID}/%(title)s.%(ext)s",
        "format": f"mp3/bestaudio/best",
        "writethumbnail": True if metadata else False,
        "embedthumbnail": True if metadata else False,
        "postprocessors": [
            {
                "key": "FFmpegMetadata",
                "add_metadata": True if metadata else False,
            },
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
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
