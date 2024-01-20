import yt_dlp

ydl_opts = {
    "outtmpl": "%(title)s.%(ext)s",
    "quiet": True,
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


def download_video(link):
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=False)
            filename = ydl.prepare_filename(result)
            ydl.download(link)
            return filename, 0
        except Exception as e:
            return e, 1
