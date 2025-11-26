# YTiz

![YTizDemo](https://github.com/tizerk/ytiz/assets/78773655/666bf1f4-f93e-4cc9-898e-a9ab43c2ab3d)

## Introduction

If you've ever tried to download music from SoundCloud or BandCamp, you've no doubt encountered the terrible "SoundcloudMP3" websites on Google that serve dozens of popup and redirect ads. These ads are often riddled with scams and malware. With YTiz, you can say goodbye to ads, trackers, slow downloads, and low-quality audio.

## 💻 Features

- Fast downloads from SoundCloud, BandCamp, Twitter, and TikTok
- Audio quality selection (From 32 - 256 kbps)
- Audio format selection (Between MP3, FLAC, and M4A)
- Embedded metadata including titles, authors, and cover art
- Download Trimming (Up to 5 minute audio clips)
- Browser Notifications and Sound Effect Options

## 🛠 Selfhosting

If you want to run YTiz on your own computer, follow these steps:

1. Clone the repository
2. Install dependencies in the `client` directory (Make sure FFmpeg is installed as well)
   ```
   npm install
   ```
3. Create a `.env` in the `client` directory
   ```
   VITE_dev_url="Your Localhost Backend URL"
   VITE_SUPABASE_ANON_KEY="Your Supabase Database Anon Key" (OPTIONAL)
   VITE_SUPABASE_URL="Your Supabase Database URL" (OPTIONAL)
   ```
4. Create another `.env` in the `flask-backend` directory
   ```
   secret_key="Your Flask App Secret Key"
   origin="Your Production Frontend URL"
   ```
5. Run the following command from the `client` directory:
   ```
   npm run dev
   ```
   For a production build, run:
   ```
   npm run build
   ```
6. Run the following command from the `flask-backend` directory:
   ```
   flask run
   ```

## Contribution

If you have any suggestions, issue reports, or want to add a feature to YTiz yourself, feel free to create issues or pull requests for this repository.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

## Built with Vite+React and Flask

[![Technologies Used](https://skillicons.dev/icons?i=vite,react,flask)](https://skillicons.dev)
