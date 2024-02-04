import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

function FAQ() {
  return (
    <>
      <h1 className="mb-[3rem] mt-[5rem] text-center text-4xl text-[var(--text)]">
        FAQ
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>Which websites are supported?</AccordionTrigger>
          <AccordionContent>
            Currently, YTiz supports audio downloading from:
            <ul className="list-disc">
              <li>YouTube</li>
              <li>SoundCloud</li>
              <li>Twitter</li>
              <li>Reddit</li>
              <li>Instagram</li>
            </ul>
            <p>
              Don't see your favorite site here?{" "}
              <Link to="https://twitter.com/ytizmp3" target="_blank">
                Suggest it on Twitter
              </Link>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Are you selling my data?</AccordionTrigger>
          <AccordionContent>
            None of your personal data is ever sold/stored by YTiz. No targeted
            ads, trackers, cookies, fingerprinting, etc. The YTiz source code is
            available to view on{" "}
            <Link to="https://github.com/tizerk/ytiz-mp3" target="_blank">
              GitHub
            </Link>
            . YTiz does not host any files, it simply downloads from 3rd party
            services. YTiz holds zero liability for what you download.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>What's your DMCA Policy?</AccordionTrigger>
          <AccordionContent>
            If you believe your copyrighted work has been improperly used on
            this platform, please send a direct message to the Twitter contact
            below. Please include a description of the copyrighted work, your
            contact details, and a statement of good faith belief that the use
            is unauthorized. Upon receipt of a notice alleging copyright
            infringement, YTiz will take whatever action it deems appropriate
            within its sole discretion, including termination of access to the
            allegedly infringing materials to prevent repeated infringement of
            copyright protected content.
            <SocialIcon
              style={{ height: "20px", width: "20px" }}
              url="https://twitter.com/ytizmp3"
              target="_blank"
            />
            <Link to="https://twitter.com/ytizmp3" target="_blank">
              @ytizmp3
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default FAQ;
