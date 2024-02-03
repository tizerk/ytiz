import yt_dlp


def download_video(link):
    ydl_opts = {
        "outtmpl": "temporary/%(title)s",
        "format": f"bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "320",
            }
        ],
        "source_address": "0.0.0.0",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=True)
            filename = ydl.prepare_filename(result).join(".mp3")
            return filename, 0
        except Exception as e:
            print(e)
            return e, 1
