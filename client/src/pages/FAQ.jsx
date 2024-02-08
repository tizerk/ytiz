import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

function FAQ() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 className="absolute top-[19%] text-center text-4xl font-semibold text-text">
        FAQ
      </h1>
      <Accordion
        className="mt-20 w-[85%] leading-loose text-text sm:w-[55%] md:w-[45%] lg:w-[30%]"
        type="single"
        collapsible
      >
        <AccordionItem value="1">
          <AccordionTrigger className="text-lg md:text-xl">
            Which websites are supported?
          </AccordionTrigger>
          <AccordionContent className="font-medium leading-relaxed">
            Currently, YTiz supports audio downloading from:
            <ul className="list-none font-extrabold tracking-wide">
              <li>- YouTube</li>
              <li>- SoundCloud</li>
              <li>- Reddit</li>
            </ul>
            <p>
              Don't see your favorite site here?{" "}
              <Link
                className="text-violet-300 hover:drop-shadow-glow"
                to="https://twitter.com/ytizmp3"
                target="_blank"
              >
                Suggest it on Twitter
              </Link>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="text-lg md:text-xl">
            Are you selling my data?
          </AccordionTrigger>
          <AccordionContent className="font-medium leading-relaxed">
            None of your personal data is ever sold/stored by YTiz. <br />
            No targeted ads, trackers, cookies, fingerprinting, etc. <br />
            <br />
            The YTiz source code is available to view on{" "}
            <Link
              className="font-extrabold tracking-wide text-violet-300 hover:drop-shadow-glow"
              to="https://github.com/tizerk/ytiz-mp3"
              target="_blank"
            >
              GitHub
            </Link>
            . <br />
            <span className="text-xs font-normal italic">
              YTiz does not host any files, it simply downloads from 3rd party
              services. YTiz holds zero liability for what you download.
            </span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="text-lg md:text-xl">
            What's your DMCA Policy?
          </AccordionTrigger>
          <AccordionContent className="pb-0 text-sm font-normal leading-relaxed">
            If you believe your copyrighted work has been improperly used on
            this platform, please send a direct message to the Twitter contact
            below. Please include a description of the copyrighted work, your
            contact details, and a statement of good faith belief that the use
            is unauthorized. Upon receipt of a notice alleging copyright
            infringement, YTiz will take whatever action it deems appropriate
            within its sole discretion, including termination of access to the
            allegedly infringing materials to prevent repeated infringement of
            copyright protected content.
            <br />
            <SocialIcon
              bgColor="transparent"
              className="mr-[0.5px] scale-[.8] md:mr-2 md:scale-[1.3]"
              url="https://twitter.com/ytizmp3"
              target="_blank"
            />
            <Link
              className="font-extrabold tracking-wide"
              to="https://twitter.com/ytizmp3"
              target="_blank"
            >
              @ytizmp3
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

export default FAQ;
