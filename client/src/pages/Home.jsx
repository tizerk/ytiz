import { useState } from "react";
import LinkInput from "../components/LinkInput";
import { motion } from "framer-motion";

function Home(props) {
  const [animate, setAnimate] = useState(false);
  const handleCallback = (download) => {
    if (download) setAnimate(true);
    else setAnimate(false);
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
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.h1
        key="animation-on-state"
        variants={variants}
        animate={animate ? "hide" : "show"}
        className="z-0 mb-4 bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-5xl font-extrabold text-transparent"
      >
        YTIZ
        <p className="z-0 mt-1 bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-lg font-semibold text-transparent opacity-60">
          YouTube and SoundCloud to MP3 Converter
        </p>
      </motion.h1>
      <LinkInput className="z-10" downloadCallback={handleCallback} />
    </motion.div>
  );
}

export default Home;
