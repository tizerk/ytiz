import LinkInput from "../components/LinkInput";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="mb-8 bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-5xl font-extrabold text-transparent">
        YTIZ
      </h1>
      <LinkInput />
    </motion.div>
  );
}

export default Home;
