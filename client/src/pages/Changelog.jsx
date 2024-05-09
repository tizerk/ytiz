import { ScrollArea } from "@/components/ui/scroll-area";
import Change from "../components/Change";
import { motion } from "framer-motion";

function Changelog() {
  return (
    <motion.div
      initial={{ opacity: "0%", scale: "97%" }}
      animate={{ opacity: "100%", scale: "100%" }}
      exit={{ opacity: "0%", scale: "98%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="absolute top-[18%] select-none text-center text-4xl font-semibold text-text ">
        Changelog
      </h1>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "tween", duration: ".15", ease: "easeInOut" }}
        className="relative mt-24 flex w-[85%] max-w-[500px] justify-center text-text hover:cursor-pointer min-[425px]:w-[75%] md:w-[50%]"
      >
        <ScrollArea className="h-full max-h-[400px] w-full max-w-[500px] rounded-xl bg-slate-700 bg-opacity-40 from-violet-800 to-slate-950 p-8 backdrop-blur-sm">
          <Change
            header="Release 3.1.2 - May 8th, 2024"
            features={[
              "Made a few minor visual tweaks for clarity and readability",
            ]}
          />
          <Change
            header="Release 3.1.1 - April 29th, 2024"
            features={[
              "Added a notice on the front page to make users aware of the violent war against YouTube",
            ]}
          />
          <Change
            header="Release 3.1.0 - April 19th, 2024"
            features={[
              "Made page-switch animations more subtle",
              "Turned the FAQ into a card for visual continuity with the Changelog",
            ]}
          />
          <Change
            header="Release 3.0.0 - April 18th, 2024"
            features={[
              "Added Support for BandCamp (Individual tracks only; album downloading not supported)",
              "Added a cumulative download counter",
              "Fixed an issue with the new hosting provider where download progress was not sent to the client",
              "Fixed a minor display issue with the FAQ",
              "Tweaked the spacing of the Changelog to make it easier to read",
            ]}
          />
          <Change
            header="Release 2.4.3 - April 15th, 2024"
            features={[
              "Changed backend hosting provider",
              "The downloading state now also shows a percentage for progress",
            ]}
          />
          <Change
            header="Release 2.4.2 - April 9th, 2024"
            features={["Updated backend to match new yt-dlp version"]}
          />
          <Change
            header="Release 2.4.1 - March 30th, 2024"
            features={[
              "Fixed an issue regarding TikTok videos with long titles",
            ]}
          />
          <Change
            header="Release 2.4.0 - March 27th, 2024"
            features={[
              "Made the donation button slightly less obtrusive on mobile",
            ]}
          />
          <Change
            header="Release 2.3.0 - March 25th, 2024"
            features={[
              "Added Support for TikTok",
              "Added Support for Twitter",
              "Removed Support for Reddit",
            ]}
          />
          <Change
            header="Release 2.2.0 - March 24th, 2024"
            features={[
              "Added random color theme selection on page load (Violet, Blue, Green, Red, Orange)",
            ]}
          />
          <Change
            header="Release 2.1.0 - March 23rd, 2024"
            features={[
              "Added the ability to select specific audio formats between MP3, M4A, and FLAC",
              "Made some visual tweaks for a simpler look",
              "Alleviated some site performance issues with the blurry splash in the background",
            ]}
          />
          <Change
            header="Release 2.0.4 - March 21st, 2024"
            features={[
              "Fixed an issue where the glow on the Settings modal wasn't aligned with the cursor",
            ]}
          />
          <Change
            header="Release 2.0.3 - March 21st, 2024"
            features={[
              "Fixed an issue with playlist-video links being immediately rejected",
            ]}
          />
          <Change
            header="Release 2.0.2 - March 15th, 2024"
            features={[
              "Fixed an issue that caused selection issues on throughout the site",
              "Fixed an issue where only the icons on the Socials buttons were clickable, not the whole button",
            ]}
          />
          <Change
            header="Release 2.0.1 - March 13th, 2024"
            features={["Updated yt-dlp backend for more stability"]}
          />
          <Change
            header="Release 2.0.0 - March 4th, 2024"
            features={[
              "Added the option to trim audio into clips (up to 5 minutes in duration)",
              "Added the option for sound effects on download complete/error",
              "Added the option for browser notifications on download complete/error",
            ]}
          />
          <Change
            header="Release 1.0.8 - March 1st, 2024"
            features={[
              `Added 3 progress state messages: "Searching," "Converting," and "Downloading"`,
              "Searching and Converting happen server-side, while Downloading speed depends on the user's internet speed",
            ]}
          />
          <Change
            header="Release 1.0.7 - February 26th, 2024"
            features={[
              "Fixed an recurring issue where unsupported site downloads would stall YTiz",
              "Fixed an issue where the toast alert would be difficult to read for light-mode users",
            ]}
          />
          <Change
            header="Release 1.0.6 - February 21st, 2024"
            features={[
              "Added a thumbnail/title/author preview of the requested download",
              "Tweaked the background to alleviate performance issues on low-end hardware",
              'Added a FAQ Section titled "What is YTiz?"',
            ]}
          />
          <Change
            header="Release 1.0.5 - February 19th, 2024"
            features={[
              "Added detailed error messages for geoblocked/private/copyright-striken videos",
              "Fixed an issue where the success/error toasts were cutoff on mobile browsers",
              "Added GitHub page to Socials",
              "Visual tweaks to URL input, navbar, and background",
            ]}
          />
          <Change
            header="Release 1.0.4 - February 15th, 2024"
            features={[
              "Added a download settings modal/drawer to remove clutter on the main page",
              "Removed the HQ toggle and added a selector dropdown for more specific quality selection",
              "Quality/Metadata settings are now saved in browser LocalStorage (this means your settings will be preserved when you reopen the website)",
              "Added the glowing outline to more stuff because it's cool",
            ]}
          />
          <Change
            header="Release 1.0.3 - February 14th, 2024"
            features={[
              "Fixed a bug where if two people were to request a download at the same time YTiz would break",
              "Fixed a bug where some videos would incorrectly be considered playlists and YTiz would break",
              "Fixed a bug where attempted downloads from unsupported websites would result in a memory leak",
            ]}
          />
          <Change
            header="Release 1.0.2 - February 9th, 2024"
            features={["Added a toggle to embed/strip metadata from downloads"]}
          />
          <Change
            header="Release 1.0.1 - February 9th, 2024"
            features={[
              "Disabled playlist downloading due to a few people trying to download 800+ track playlists and crashing YTiz",
              "Downloads are now properly limited to 1 hour (Long audio previously stalled the application)",
              "URL input is now cleared after downloads/errors",
            ]}
          />
          <Change
            header="Release 1.0.0 - February 8th, 2024"
            features={["YTiz is Out!"]}
          />
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}

export default Changelog;
