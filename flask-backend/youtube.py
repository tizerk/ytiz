import yt_dlp


def remove_last_substring(string, substring):
    last_index = string.rfind(substring)
    if last_index != -1:
        return string[:last_index] + string[last_index + len(substring) :]
    else:
        return string


def download_video(link, hqMode, metadata):
    ydl_opts = {
        "outtmpl": "temporary/%(title)s.%(ext)s",
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
                "preferredquality": "320" if hqMode else "128",
            },
            {
                "key": "EmbedThumbnail",
            },
        ],
        "noplaylist": True,
        "source_address": "0.0.0.0",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(link, download=False)
            if result["duration"] > 3600:
                return (
                    Exception("Audio longer than 1 hour is not currently supported!"),
                    2,
                )
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
            ydl.download(link)
            return filename, 0
        except Exception as e:
            print(e)
            return e, 1
