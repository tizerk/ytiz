import { ScrollArea } from "@/components/ui/scroll-area";
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
      <h1 className=" absolute top-[18%] mb-20 text-center text-4xl font-semibold text-text ">
        Changelog
      </h1>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "tween", duration: ".15", ease: "easeInOut" }}
        className="flex w-[85%] justify-center text-text min-[425px]:w-[75%]"
      >
        <ScrollArea className="h-full max-h-[400px] w-full max-w-[500px] rounded-xl bg-gradient-to-b from-input_top to-input_bot p-8">
          <div>
            <h3 className="mb-3 ml-1 text-sm font-semibold min-[420px]:text-sm min-[420px]:font-semibold sm:ml-5 sm:text-2xl">
              Release 1.0.0 - February 15th, 2024
            </h3>
            <p className="text-lg italic sm:text-xl">New Features</p>
            <ul className="mb-3 ml-5 list-disc text-sm sm:text-base">
              <li>YTiz is out!</li>
            </ul>
            <p className="text-lg italic sm:text-xl">Known Issues</p>
            <ul className="mb-3 ml-5 list-disc text-sm sm:text-base">
              <li>None</li>
            </ul>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}

export default Changelog;
