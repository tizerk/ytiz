import { useEffect, useState, useRef } from "react";
import DownloadPreview from "./DownloadPreview";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useMediaQuery from "./hooks/useMediaQuery";
import ToggleSwitch from "./ToggleSwitch";

const qualities = [
  {
    value: "320",
    label: "320kbps",
  },
  {
    value: "256",
    label: "256kbps",
  },
  {
    value: "192",
    label: "192kbps",
  },
  {
    value: "128",
    label: "128kbps",
  },
  {
    value: "64",
    label: "64kbps",
  },
  {
    value: "32",
    label: "32kbps",
  },
];

function LinkInput(props) {
  const [link, setLink] = useState("");
  const [metadata, setMetadata] = useState(() => {
    const saved = localStorage.getItem("metadata");
    if (saved == "false") return false;
    else return true;
  });
  const [thumbnailURL, setThumbnailURL] = useState("#");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [download, setDownload] = useState(false);
  const [infoProcessed, setInfoProcessed] = useState(false);
  const [dlProgress, setDLProgress] = useState(0);
  const [dlState, setDLState] = useState("");
  const [open, setOpen] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [selectedQuality, setSelectedQuality] = useState(() => {
    const saved = localStorage.getItem("selectedQuality");
    return saved || "320";
  });
  const baseFetchURL = import.meta.env.PROD
    ? import.meta.env.VITE_fetch_url
    : import.meta.env.VITE_dev_url;
  const inputContainer = useRef();
  const settingsButton = useRef();
  const settingsDialog = useRef();
  const applyOverlayMask = (e) => {
    const documentTarget = e.currentTarget;
    let x = 0;
    let y = 0;
    let buttonX = 0;
    let buttonY = 0;
    if (inputContainer.current) {
      x = e.pageX - inputContainer.current.offsetLeft;
      y = e.pageY - inputContainer.current.offsetTop;

      buttonX = e.pageX - settingsButton.current.offsetLeft;
      buttonY = e.pageY - settingsButton.current.offsetTop;
    }

    let settingsX = 0;
    let settingsY = 0;
    if (settingsDialog.current) {
      settingsX = e.pageX - settingsDialog.current.offsetLeft + 180;
      settingsY = e.pageY - settingsDialog.current.offsetTop + 130;
    }

    documentTarget.setAttribute(
      "style",
      `--x: ${x}px; --y: ${y}px; --buttonX: ${buttonX}px; --buttonY: ${buttonY}px; --settingsX: ${settingsX}px; --settingsY: ${settingsY}px; --opacity: 1`,
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", (e) => {
      applyOverlayMask(e);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedQuality", selectedQuality);
  }, [selectedQuality]);

  useEffect(() => {
    localStorage.setItem("metadata", `${metadata}`);
  }, [metadata]);

  const handleSetOpen = () => {
    setOpen(!open);
  };

  const handleMetadataSwitch = () => {
    setMetadata(!metadata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownload(true);
    setDLState("Searching for Audio...");
    props.downloadCallback(true);
    let filename = "";
    let randID = 0;
    try {
      const infoResponse = await fetch(`${baseFetchURL}/api/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link,
        }),
      });
      const previewInfo = await infoResponse.json();
      if (previewInfo["error"]) {
        toast.error(previewInfo["error"]);
        props.downloadCallback(false);
        setDownload(false);
        return;
      } else {
        setDLState("Converting Data... (Please Wait)");
        setThumbnailURL(previewInfo["thumbnail"]);
        setTitle(previewInfo["title"]);
        setAuthor(previewInfo["author"]);
        setInfoProcessed(true);
        filename = previewInfo["filename"];
        randID = previewInfo["randID"];

        const response = await fetch(`${baseFetchURL}/api/download`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: link,
            quality: selectedQuality,
            metadata: metadata,
            filename: filename,
            randID: randID,
          }),
        });
        const data = await response.json();

        if (!data["filename"] && !data["filepath"] && data["error"]) {
          toast.error(data["error"]);
          props.downloadCallback(false);
          setDownload(false);
        } else {
          const filename = data["filename"];
          const filepath = data["filepath"];
          const randID = data["randID"];
          setDLState("Downloading File:  ");
          const fileResponse = await fetch(`${baseFetchURL}/api/file_send`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filepath: filepath,
              randID: randID,
            }),
          });

          const contentLength = fileResponse.headers.get("Content-Length");
          const totalLength =
            typeof contentLength === "string" && parseInt(contentLength);
          const reader = fileResponse.body.getReader();
          const chunks = [];

          let receivedLength = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log("Finished");
              break;
            }
            receivedLength = receivedLength + value.length;
            chunks.push(value);
            if (typeof totalLength === "number") {
              const step = (receivedLength / totalLength) * 100;
              setDLProgress(step);
            }
          }
          const blob = new Blob(chunks);
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename.replace(`temporary_${randID}/`, "");
          a.click();
          const handleOnDownload = () => {
            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
              a.removeEventListener("click", handleOnDownload);
            }, 150);
          };
          a.addEventListener("click", handleOnDownload);

          await fetch(`${baseFetchURL}/api/clear`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              randID: randID,
            }),
          });
          toast.success(
            `${filename.replace(`temporary_${randID}/`, "")} has been successfully downloaded!`,
          );
        }
      }
      setDownload(false);
      setDLState("");
      setDLProgress(0);
      setInfoProcessed(false);
      props.downloadCallback(false);
      setLink("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[85%] sm:w-[70%] md:w-[55%] lg:w-[40%]">
        <AnimatePresence>
          {infoProcessed && (
            <motion.div
              style={{ overflow: "hidden" }}
              key="animation-on-state"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: isDesktop ? 295 : 245 }}
              transition={{ ease: "easeInOut", duration: 1.2 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <DownloadPreview
                thumbnail={thumbnailURL}
                title={title}
                author={author}
                className={`flex justify-center`}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <form
          name="inputForm"
          className="relative flex w-full flex-row items-center justify-center"
          onSubmit={handleSubmit}
          autoComplete="off"
          ref={inputContainer}
        >
          <Input
            className="mb-2 rounded-full border-none bg-transparent bg-gradient-to-b from-input_top to-input_bot py-9 pl-10 pr-20 text-xl font-bold text-text outline-none backdrop-blur-sm placeholder:font-bold focus:bg-[#151934] focus:outline-none"
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
                18rem 18rem at var(--x) var(--y),
                #000 1%,
                transparent 50%
              )`,
              WebkitMask: `
              radial-gradient(
                18rem 18rem at var(--x) var(--y),
                #000 1%,
                transparent 50%
              )`,
            }}
            id="fakeInput"
            className="pointer-events-none absolute mb-2 select-none rounded-full border-2 border-[#b399ff] bg-transparent py-9 pl-10 pr-20 text-xl font-bold text-transparent outline-none"
            disabled={download}
          />
          <Button
            className="absolute right-4 mb-2 aspect-auto h-[50px] w-[50px] rounded-full border-[3px] border-text bg-transparent transition-all delay-0 duration-200 ease-out hover:drop-shadow-heavy_glow"
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
        <AnimatePresence>
          {dlState != "" && (
            <motion.div
              style={{ overflow: "hidden" }}
              key="animation-on-state"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 25 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-center"
            >
              {dlState && (
                <p className="text-center text-base font-semibold text-text">
                  {dlState}
                </p>
              )}
              {dlProgress != 0 && (
                <span className="ml-2 text-center text-base font-semibold text-text">
                  {`${parseInt(dlProgress)}%`}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-center">
          <div>
            {isDesktop ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mt-8"
                    ref={settingsButton}
                  >
                    <Button className="w-full rounded-full border-none bg-transparent bg-gradient-to-b from-input_top to-input_bot font-bold outline-none backdrop-blur-sm">
                      Settings
                    </Button>
                    <Button
                      style={{
                        opacity: "var(--opacity, 0)",
                        mask: `
                        radial-gradient(
                          5rem 5rem at var(--buttonX) var(--buttonY),
                          #000 1%,
                          transparent 50%
                          )`,
                        WebkitMask: `
                          radial-gradient(
                            5rem 5rem at var(--buttonX) var(--buttonY),
                        #000 1%,
                        transparent 50%
                        )`,
                      }}
                      className="pointer-events-none absolute inset-0 w-full select-none rounded-full border-2 border-[#b399ff] bg-[#3a3a63] font-bold outline-none"
                    >
                      Settings
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent
                  ref={settingsDialog}
                  className="absolute max-w-80 border-none bg-input_bot backdrop-blur-[4px]"
                >
                  <div
                    style={{
                      opacity: "var(--opacity, 0)",
                      mask: `
                        radial-gradient(
                          24rem 24rem at var(--settingsX) var(--settingsY),
                          #000 1%,
                          transparent 50%
                          )`,
                      WebkitMask: `
                          radial-gradient(
                            24rem 24rem at var(--settingsX) var(--settingsY),
                        #000 1%,
                        transparent 50%
                        )`,
                    }}
                    className="pointer-events-none absolute inset-0 z-0 select-none rounded-2xl border-2 border-[#a799ff] bg-[#1c1b34] bg-opacity-90 outline-none"
                  />
                  <div className="relative z-10 font-nunito ">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="font-bold">
                        Edit Settings
                      </DialogTitle>
                      <DialogDescription>
                        Adjust your download settings here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mb-4 flex flex-row items-center justify-between">
                      <Popover open={openQuality} onOpenChange={setOpenQuality}>
                        <Label
                          htmlFor="qualityPopover"
                          className="bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-base font-extrabold text-transparent"
                        >
                          Quality
                        </Label>
                        <PopoverTrigger
                          className="border-[1px] bg-input_bot text-text hover:bg-input_top hover:text-text"
                          asChild
                        >
                          <Button
                            id="qualityPopover"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                          >
                            {selectedQuality + "kbps"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full border-[1px] bg-input_bot text-right backdrop-blur-md">
                          <Command value={selectedQuality}>
                            <CommandList>
                              <CommandGroup>
                                {qualities.map((quality) => (
                                  <CommandItem
                                    className="cursor-pointer text-text hover:bg-gray-700 "
                                    key={quality.value}
                                    value={quality.value}
                                    onSelect={() => {
                                      setSelectedQuality(quality.value);
                                      setOpenQuality(false);
                                    }}
                                  >
                                    {quality.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <TooltipProvider>
                        <Tooltip delayDuration="500">
                          <TooltipTrigger className="text-text">
                            <Label
                              className="cursor-pointer bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="metadata-toggle"
                            >
                              Embed Metadata
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            label=""
                            id="metadata-toggle"
                            checked={metadata}
                            onCheckedChange={handleMetadataSwitch}
                          />
                          <TooltipContent
                            className="m-auto w-2/3"
                            side="bottom"
                          >
                            <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                              <strong>Enabled</strong> - Embeds title, artist,
                              year, and thumbnail to the file
                              <br />
                              <strong>Disabled</strong> - No metadata embedded
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <DialogFooter className="mt-6">
                      <Button
                        className="rounded-full bg-[#232131] hover:bg-input_top"
                        type="submit"
                        onClick={handleSetOpen}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mt-8"
                    ref={settingsButton}
                  >
                    <Button className="w-full rounded-full border-none bg-gradient-to-b from-input_top to-input_bot font-bold outline-none backdrop-blur-sm">
                      Settings
                    </Button>
                    <Button
                      style={{
                        opacity: "var(--opacity, 0)",
                        mask: `
                        radial-gradient(
                          5rem 5rem at var(--buttonX) var(--buttonY),
                          #000 1%,
                          transparent 50%
                          )`,
                        WebkitMask: `
                          radial-gradient(
                            5rem 5rem at var(--buttonX) var(--buttonY),
                        #000 1%,
                        transparent 50%
                        )`,
                      }}
                      className="pointer-events-none absolute inset-0 w-full select-none rounded-full border-2 border-[#b399ff] bg-[#3a3a63] font-bold outline-none"
                    >
                      Settings
                    </Button>
                  </motion.div>
                </DrawerTrigger>
                <DrawerContent
                  ref={settingsDialog}
                  className="rounded-t-3xl border-none bg-input_bot px-14 backdrop-blur-[6px]"
                >
                  <div className="relative z-10 font-nunito ">
                    <DrawerHeader className="mb-6">
                      <DrawerTitle className="text-xl font-semibold text-text">
                        Edit Settings
                      </DrawerTitle>
                      <DrawerDescription className="text-sm font-normal min-[425px]:text-lg">
                        Adjust your download settings here.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="mb-8 flex flex-row items-center justify-between">
                      <Popover open={openQuality} onOpenChange={setOpenQuality}>
                        <Label
                          htmlFor="qualityPopover"
                          className="bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-base font-extrabold text-transparent"
                        >
                          Quality
                        </Label>
                        <PopoverTrigger
                          className="border-[1px] bg-input_bot text-text hover:bg-input_top hover:text-text"
                          asChild
                        >
                          <Button
                            id="qualityPopover"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                          >
                            {selectedQuality + "kbps"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full border-[1px] bg-input_bot text-right backdrop-blur-md">
                          <Command value={selectedQuality}>
                            <CommandList>
                              <CommandGroup>
                                {qualities.map((quality) => (
                                  <CommandItem
                                    className="text-text"
                                    key={quality.value}
                                    value={quality.value}
                                    onSelect={() => {
                                      setSelectedQuality(quality.value);
                                      setOpenQuality(false);
                                    }}
                                  >
                                    {quality.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <TooltipProvider>
                        <Tooltip delayDuration="500">
                          <TooltipTrigger className="text-text">
                            <Label
                              className="cursor-pointer bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="metadata-toggle"
                            >
                              Embed Metadata
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            label=""
                            id="metadata-toggle"
                            checked={metadata}
                            onCheckedChange={handleMetadataSwitch}
                          />
                          <TooltipContent
                            className="m-auto w-2/3"
                            side="bottom"
                          >
                            <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                              <strong>Enabled</strong> - Embeds title, artist,
                              year, and thumbnail to the file
                              <br />
                              <strong>Disabled</strong> - No metadata embedded
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <DrawerFooter>
                      <Button
                        className="w-2/3 rounded-full bg-[#232131] hover:bg-input_top"
                        type="submit"
                        onClick={handleSetOpen}
                      >
                        Close
                      </Button>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
        <Toaster offset={"45px"} position="bottom-center" />
      </div>
    </>
  );
}
export default LinkInput;
