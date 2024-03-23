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
        <h1 className="absolute top-[18%] select-none text-center text-4xl font-semibold text-text">
          Socials
        </h1>
        <p className="mb-10 block select-none text-lg text-text ">
          Stay up to date with future updates!
        </p>
        <div className="flex flex-row items-center justify-center gap-6 min-[425px]:gap-10">
          <motion.a
            href="https://twitter.com/ytizmp3"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "tween", duration: ".2", ease: "easeInOut" }}
            className="flex h-40 w-40 flex-col items-center justify-center rounded-xl bg-slate-600 bg-opacity-25 from-input_top to-input_bot backdrop-blur-sm hover:drop-shadow-small_glow min-[540px]:h-52 min-[540px]:w-56"
          >
            <SocialIcon
              bgColor="transparent"
              className="scale-[2.5]"
              target="_blank"
              url="https://twitter.com/ytizmp3"
            />
            <a className="mt-10 select-none text-lg text-text">Twitter</a>
          </motion.a>
          <motion.a
            href="https://twitter.com/ytizmp3"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "tween", duration: ".2", ease: "easeInOut" }}
            className="flex h-40 w-40 flex-col items-center justify-center rounded-xl bg-slate-600 bg-opacity-25 from-input_top to-input_bot backdrop-blur-sm hover:drop-shadow-small_glow min-[540px]:h-52 min-[540px]:w-56"
          >
            <SocialIcon
              bgColor="transparent"
              className="scale-[2.5]"
              url="https://github.com/tizerk/ytiz"
              target="_blank"
            />
            <a className="mt-10 select-none text-lg text-text">GitHub</a>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default Socials;
