import { ScrollArea } from "@/components/ui/scroll-area";
import Change from "../components/Change";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

function Changelog() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className=" absolute top-[18%] text-center text-4xl font-semibold text-text ">
        Changelog
      </h1>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "tween", duration: ".15", ease: "easeInOut" }}
        className="relative mt-24 flex w-[85%] max-w-[500px] justify-center text-text hover:cursor-pointer min-[425px]:w-[75%] md:w-[50%]"
      >
        <ScrollArea className="h-full max-h-[400px] w-full max-w-[500px] rounded-xl bg-gradient-to-b from-input_top to-input_bot p-8">
          <Change
            header="Release 1.0.4 - February 15th, 2024"
            features={[
              "Added a download settings modal/drawer to remove clutter on the main page",
              "Removed the HQ toggle and added a selector dropdown for more specific quality selection",
              "Quality/Metadata settings are now saved in browser LocalStorage (this means your settings will be preserved when you reopen the website)",
              "Added the glowing outline to more stuff because it's cool",
            ]}
            issues={["None"]}
          />
          <Change
            header="Release 1.0.3 - February 14th, 2024"
            features={[
              "Fixed a bug where if two people were to request a download at the same time YTiz would break",
              "Fixed a bug where some videos would incorrectly be considered playlists and YTiz would break",
              "Fixed a bug where attempted downloads from unsupported websites would result in a memory leak",
            ]}
            issues={["None"]}
          />
          <Change
            header="Release 1.0.2 - February 9th, 2024"
            features={["Added a toggle to embed/strip metadata from downloads"]}
            issues={["None"]}
          />
          <Change
            header="Release 1.0.1 - February 9th, 2024"
            features={[
              "Disabled playlist downloading due to a few people trying to download 800+ track playlists and crashing YTiz",
              "Downloads are now properly limited to 1 hour (Long audio previously stalled the application)",
              "URL input is now cleared after downloads/errors",
            ]}
            issues={["None"]}
          />
          <Change
            header="Release 1.0.0 - February 8th, 2024"
            features={["YTiz is Out!"]}
            issues={["None"]}
          />
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}

export default Changelog;
