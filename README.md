# YTiz

![YTiz Demo Video](https://i.imgur.com/UzYXblU.gif)

## Introduction

If you've ever tried to download songs from YouTube or SoundCloud, you've no doubt encountered the terrible "YTMP3" websites on Google that serve dozens of popup and redirect ads. With YTiz, you can say goodbye to the ads, trackers, slow downloads, and low-quality audio.

## 💻 Features

- Fast downloads from YouTube, SoundCloud, and Reddit
- Toggle between 320kbps and 128kbps downloads
- Embedded metadata including titles, authors, and cover art
- Playlist downloading from YouTube (Only for selfhosters)

## 🛠 Selfhosting

If you want to run YTiz on your own computer, follow these steps:

1. Clone the repository
2. Install dependencies (Make sure FFmpeg is installed as well)
   ```
   npm install
   ```
3. Create a `.env` in the `client` directory
   ```
   VITE_fetch_url="Your Production Backend URL"
   VITE_dev_url="Your Localhost Backend URL"
   ```
4. Create another `.env` in the `flask-backend` directory
   ```
   secret_key="Your Flask App Secret Key"
   origin="Your Production Frontend URL"
   ```
5. Run the following command:
   ```
   npm run dev
   ```
   For a production build, run:
   ```
   npm run build
   ```
   > To download playlists, go to the `ytiz/flask-backend/youtube.py` file, set `"noplaylist"` to `False`, and delete the `"playlist_items": "0"` line

## 🎁 Donate

<a href="https://ko-fi.com/tizerk">
  <img src="https://assets-global.website-files.com/5c14e387dab576fe667689cf/64f1a9ddd0246590df69ea1a_kofi_short_button_dark%25402x-p-500.png" />
<a/>

## Contribution

If you have any suggestions, issue reports, or want to add a feature to YTiz yourself, feel free to create issues or pull requests for this repository.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

## Built with Vite+React and Flask

[![Technologies Used](https://skillicons.dev/icons?i=vite,react,flask)](https://skillicons.dev)
