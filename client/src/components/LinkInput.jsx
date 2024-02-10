import { useEffect, useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ToggleSwitch from "./ToggleSwitch";

function LinkInput() {
  const [link, setLink] = useState("");
  const [hqMode, SetHqMode] = useState(true);
  const [metadata, setMetadata] = useState(true);
  const [download, setDownload] = useState(false);
  const baseFetchURL = import.meta.env.PROD
    ? import.meta.env.VITE_fetch_url
    : import.meta.env.VITE_dev_url;
  const inputContainer = useRef();
  const applyOverlayMask = (e) => {
    const documentTarget = e.currentTarget;
    if (!inputContainer.current) {
      return;
    }

    const x = e.pageX - inputContainer.current.offsetLeft;
    const y = e.pageY - inputContainer.current.offsetTop;

    documentTarget.setAttribute(
      "style",
      `--x: ${x}px; --y: ${y}px; --opacity: 1`,
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", (e) => {
      applyOverlayMask(e);
    });
  }, []);

  const handleHqSwitch = () => {
    SetHqMode(!hqMode);
  };
  const handleMetadataSwitch = () => {
    setMetadata(!metadata);
  };
  const handleSubmit = async (e) => {
    setDownload(true);
    e.preventDefault();

    try {
      const response = await fetch(`${baseFetchURL}/api/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link,
          quality: hqMode,
          metadata: metadata,
        }),
      });

      const data = await response.json();

      if (!data["filename"] && !data["filepath"] && data["error"]) {
        toast.error(data["error"]);
        setDownload(false);
      } else {
        const filename = data["filename"];
        const filepath = data["filepath"];

        const fileResponse = await fetch(`${baseFetchURL}/api/file_send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filepath: filepath,
          }),
        });

        const blob = await fileResponse.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename.replace("temporary/", "");
        link.click();
        URL.revokeObjectURL(downloadUrl);

        await fetch(`${baseFetchURL}/api/clear`, { method: "POST" });
        toast.success(
          `${filename.replace("temporary/", "")} has been successfully downloaded!`,
        );
      }
      setDownload(false);
      setLink("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[85%] sm:w-[70%] md:w-[55%] lg:w-[40%]">
        <form
          className="relative flex w-full flex-row items-center justify-center"
          onSubmit={handleSubmit}
          autoComplete="off"
          ref={inputContainer}
        >
          <Input
            className="rounded-full border-2 border-transparent bg-gradient-to-b from-input_top to-input_bot py-9 pl-10 pr-20 text-xl font-bold text-text outline-none backdrop-blur-sm placeholder:font-bold focus:bg-[#101025] focus:outline-none"
            type="url"
            id="url"
            name="url"
            placeholder="Enter URL Here..."
            value={link}
            disabled={download}
            onChange={(e) => setLink(e.target.value)}
          />
          <Input
            style={{
              opacity: "var(--opacity, 0)",
              mask: `
              radial-gradient(
                25rem 25rem at var(--x) var(--y),
                #000 1%,
                transparent 50%
              )`,
              WebkitMask: `
              radial-gradient(
                25rem 25rem at var(--x) var(--y),
                #000 1%,
                transparent 50%
              )`,
            }}
            className="pointer-events-none absolute select-none rounded-full border-2 border-[#b399ff] bg-transparent from-input_top to-input_bot py-9 pl-10 pr-20 text-xl font-bold text-transparent outline-none"
            disabled={download}
          />
          <Button
            className="absolute right-4 aspect-auto h-[50px] w-[50px] rounded-full border-[3px] border-text bg-transparent transition-all delay-0 duration-200 ease-out hover:drop-shadow-heavy_glow"
            variant="default"
            size="icon"
            disabled={!link || download}
            type="submit"
          >
            {download ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <ChevronRight className="h-8 w-8" />
            )}
          </Button>
        </form>
        <div className="mt-16 flex flex-col justify-center gap-24">
          <div className="flex flex-row justify-center">
            <TooltipProvider>
              <Tooltip delayDuration="500">
                <ToggleSwitch
                  label=""
                  id="hq-toggle"
                  checked={hqMode}
                  onCheckedChange={handleHqSwitch}
                />
                <TooltipTrigger className="text-text">
                  <Label
                    className="cursor-pointer bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-lg font-bold text-transparent"
                    htmlFor="hq-toggle"
                  >
                    High Quality Mode
                  </Label>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                    Enabled - 320kbps downloads
                    <br />
                    Disabled - 128kbps downloads
                    <p className="text-xs italic">
                      SoundCloud only supports 128kbps
                    </p>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-row justify-center">
            <TooltipProvider>
              <Tooltip delayDuration="500">
                <ToggleSwitch
                  label=""
                  id="metadata-toggle"
                  checked={metadata}
                  onCheckedChange={handleMetadataSwitch}
                />
                <TooltipTrigger className="text-text">
                  <Label
                    className="cursor-pointer bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-lg font-bold text-transparent"
                    htmlFor="metadata-toggle"
                  >
                    Embedded Metadata
                  </Label>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                    Enabled - Embeds title, artist, year, and thumbnail to the
                    file
                    <br />
                    Disabled - No metadata embedded
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Toaster offset={"45px"} position="bottom-center" />
      </div>
    </>
  );
}
export default LinkInput;
