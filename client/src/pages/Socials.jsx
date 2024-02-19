import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

function Socials() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex	h-full w-full flex-col items-center justify-center"
    >
      <div className="flex flex-col  items-center">
        <h1 className="absolute top-[18%] text-center text-4xl font-semibold text-text">
          Socials
        </h1>
        <p className="mb-10 block text-lg text-text ">
          Stay up to date with future updates!
        </p>
        <div className="flex flex-row items-center justify-center gap-6 min-[425px]:gap-10">
          <motion.div
            href="https://twitter.com/ytizmp3"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "tween", duration: ".2", ease: "easeInOut" }}
            className="flex h-40 w-40 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-input_top to-input_bot backdrop-blur-sm hover:drop-shadow-glow min-[540px]:h-52 min-[540px]:w-56"
          >
            <SocialIcon
              bgColor="transparent"
              className="scale-[2.5]"
              url="https://twitter.com/ytizmp3"
              target="_blank"
            />
            <a
              href="https://twitter.com/ytizmp3"
              target="_blank"
              className="mt-10 text-lg text-text"
            >
              Twitter
            </a>
          </motion.div>
          <motion.div
            href="https://twitter.com/ytizmp3"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "tween", duration: ".2", ease: "easeInOut" }}
            className="flex h-40 w-40 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-input_top to-input_bot backdrop-blur-sm hover:drop-shadow-glow min-[540px]:h-52 min-[540px]:w-56"
          >
            <SocialIcon
              bgColor="transparent"
              className="scale-[2.5]"
              url="https://github.com/tizerk/ytiz"
              target="_blank"
            />
            <a
              href="https://github.com/tizerk/ytiz"
              target="_blank"
              className="mt-10 text-lg text-text"
            >
              GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Socials;
