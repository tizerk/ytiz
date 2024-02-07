import { ScrollArea } from "@/components/ui/scroll-area";
import Change from "../components/Change";
import { motion } from "framer-motion";

function Changelog() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className=" absolute top-[19%] mb-20 text-center text-4xl font-semibold text-text ">
        Changelog
      </h1>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "tween", duration: ".15", ease: "easeInOut" }}
        className="flex w-[85%] justify-center text-text min-[425px]:w-[75%]"
      >
        <ScrollArea className="h-full max-h-[400px] w-full max-w-[500px] rounded-xl bg-gradient-to-b from-input_top to-input_bot p-8">
          <Change
            header="Release 1.0.0 - February 15th, 2024"
            features={["YTiz is Out!"]}
            issues={["None"]}
          />
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}

export default Changelog;
