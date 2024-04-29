import { useState, useEffect } from "react";
import LinkInput from "../components/LinkInput";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

function Home(props) {
  const [animate, setAnimate] = useState(false);
  const [formattedDLCount, setFormattedDLCount] = useState("");
  const [dlFetchError, setDLFetchError] = useState(false);
  useEffect(() => {
    async function getCount() {
      const { data, error } = await supabase
        .from("Downloads")
        .select()
        .single();
      if (error) {
        console.log(error);
        setDLFetchError(true);
      }
      let count = data["count"];
      count = count.toLocaleString();
      setFormattedDLCount(count);
    }
    getCount();
  }, []);
  const handleCallback = (download) => {
    if (download) setAnimate(true);
    else {
      setAnimate(false);
      async function getCount() {
        const { data, error } = await supabase
          .from("Downloads")
          .select()
          .single();
        if (error) {
          console.log(error);
          setDLFetchError(true);
        }
        let count = data["count"];
        count = count.toLocaleString();
        setFormattedDLCount(count);
      }
      getCount();
    }
  };
  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        ease: "easeInOut",
        duration: 1,
      },
    },
    hide: {
      y: 30,
      opacity: 0,
      transition: {
        delay: 0.1,
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: "0%", scale: "97%" }}
      animate={{ opacity: "100%", scale: "100%" }}
      exit={{ opacity: "0%", scale: "98%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.h1
        key="animation-on-state"
        variants={variants}
        animate={animate ? "hide" : "show"}
        className="z-0 mb-4 select-none bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-5xl font-extrabold text-transparent"
      >
        YTIZ
        <p className="z-0 mt-1 select-none bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-base font-semibold text-transparent opacity-60">
          MP3 Converter for YouTube | SoundCloud | BandCamp | Twitter | TikTok
        </p>
      </motion.h1>
      {/* <div className="bg-red-500 text-center font-bold text-text">
        <h1>YOUTUBE DOWNLOADING IS CURRENTLY DOWN, PLEASE CHECK BACK LATER</h1>
        <p className="text-sm">
          YouTube is currently blocking YTiz; I'm trying to work around it.
          Thanks for your patience. Other sites should work as expected.
        </p>
      </div> */}
      <div className="mb-5 w-[90%] rounded-2xl bg-red-900 p-5 text-center font-bold text-text sm:w-[70%] md:w-1/2 lg:w-1/3">
        <h1>YouTube Downloading May Not Work!</h1>
        <p className="text-sm font-normal">
          YouTube has been attempting to block YTiz from accessing its streams
          for the past week. I am working on a fix, but it will take some time.
          Until then, YouTube downloading may stop working intermittently. The
          remaining sites still work as usual.
        </p>
        <p className="mt-2 text-base font-bold">
          I apologize for the inconvenience.
        </p>
      </div>
      <LinkInput
        colorTheme={props.colorTheme}
        className="z-10"
        downloadCallback={handleCallback}
        cumulativeDLCount={formattedDLCount}
      />
      {!dlFetchError && (
        <div className="absolute bottom-8 select-none text-lg font-semibold text-text opacity-50">
          <p>{formattedDLCount} Files Downloaded!</p>
        </div>
      )}
    </motion.div>
  );
}

export default Home;
