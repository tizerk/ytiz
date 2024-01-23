import yt_dlp

ydl_opts = {
    "outtmpl": "temporary/%(title)s.%(ext)s",
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
            converted_filename = filename.replace(".webm", ".mp3")
            return converted_filename, 0
        except Exception as e:
            print(e)
            return e, 1
