import yt_dlp


def download_video(link, hqMode):
    ydl_opts = {
        "outtmpl": "temporary/%(title)s",
        "format": f"bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "320" if hqMode else "128",
            }
        ],
        "source_address": "0.0.0.0",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=False)
            if "entries" in result:
                filename = ydl.prepare_filename(result) + ".zip"
            else:
                filename = ydl.prepare_filename(result) + ".mp3"
            ydl.download(link)
            return filename, 0
        except Exception as e:
            print(e)
            return e, 1
