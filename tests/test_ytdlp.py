import yt_dlp


def test_ytdlp():
    with yt_dlp.YoutubeDL({"quiet": "True"}) as ydl:
        info = ydl.extract_info(
            "https://www.youtube.com/watch?v=jNQXAC9IVRw", download=False
        )
        assert (
            info["title"] == "Me at the zoo"
        ), "The extracted video title is incorrect.  Check your yt-dlp installation."
        assert (
            info["duration"] == 19
        ), "The extracted video duration is incorrect.  Check your yt-dlp installation."
        print("yt-dlp is working as expected.")
        return


test_ytdlp()
