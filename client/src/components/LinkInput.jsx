import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import DownloadPreview from "./DownloadPreview";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
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
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "../lib/supabase";
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
import successSFX from "../../public/assets/success.mp3";
import errorSFX from "../../public/assets/err.mp3";
import Kofi from "../../public/assets/kofi.svg";

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
  const fetchMachineID = Math.floor(Math.random() * 6);
  const fetchMachineURLS = [
    import.meta.env.VITE_m1,
    import.meta.env.VITE_m2,
    import.meta.env.VITE_m3,
    import.meta.env.VITE_m4,
    import.meta.env.VITE_m5,
    import.meta.env.VITE_m6,
  ];
  const fetchURL = fetchMachineURLS[fetchMachineID];
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
  const [trim, setTrim] = useState(false);
  const [startMin, setStartMin] = useState("");
  const [startSecs, setStartSecs] = useState("");
  const [endMin, setEndMin] = useState("");
  const [endSecs, setEndSecs] = useState("");
  const [successSound] = useSound(successSFX);
  const [errorSound] = useSound(errorSFX);
  const [sound, setSound] = useState(() => {
    const saved = localStorage.getItem("sound");
    if (saved == "true") return true;
    else return false;
  });
  const [notif, setNotif] = useState(() => {
    const saved = localStorage.getItem("notif");
    if (saved == "true") return true;
    else return false;
  });
  const [mp3, setMP3] = useState(() => {
    const saved = localStorage.getItem("format");
    if (saved == "mp3") return true;
    else if (saved != "flac" && saved != "m4a") return true;
    else return false;
  });
  const [flac, setFLAC] = useState(() => {
    const saved = localStorage.getItem("format");
    if (saved == "flac") return true;
    else return false;
  });
  const [m4a, setM4A] = useState(() => {
    const saved = localStorage.getItem("format");
    if (saved == "m4a") return true;
    else return false;
  });
  const [infoProcessed, setInfoProcessed] = useState(false);
  const [dlProgress, setDLProgress] = useState(0);
  const [dlState, setDLState] = useState("");
  const [open, setOpen] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [selectedQuality, setSelectedQuality] = useState(() => {
    const saved = localStorage.getItem("selectedQuality");
    return saved || "192";
  });
  const [downloadCount, setDownloadCount] = useState(() => {
    const saved = localStorage.getItem("downloadCount");
    if (saved) return parseInt(saved);
    else return 0;
  });
  const [openDonate, setOpenDonate] = useState(false);
  const baseFetchURL = import.meta.env.PROD
    ? fetchURL
    : import.meta.env.VITE_dev_url;
  // const baseFetchURL = fetchURL;
  const cumulativeDLCount = props.cumulativeDLCount;
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
      settingsX = e.pageX - settingsDialog.current.offsetLeft + 160;
      settingsY = e.pageY - settingsDialog.current.offsetTop + 290;
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
    if (downloadCount == 20 || downloadCount == 50) {
      setOpenDonate(true);
    }
    localStorage.setItem("downloadCount", downloadCount);
  }, [downloadCount]);

  useEffect(() => {
    localStorage.setItem("selectedQuality", selectedQuality);
  }, [selectedQuality]);

  useEffect(() => {
    localStorage.setItem("metadata", `${metadata}`);
  }, [metadata]);

  useEffect(() => {
    localStorage.setItem("sound", `${sound}`);
  }, [sound]);

  useEffect(() => {
    localStorage.setItem("notif", `${notif}`);
  }, [notif]);

  useEffect(() => {
    if (mp3) localStorage.setItem("format", `${"mp3"}`);
    if (m4a) localStorage.setItem("format", `${"m4a"}`);
    if (flac) localStorage.setItem("format", `${"flac"}`);
    if (!mp3 && !m4a && !flac) localStorage.setItem("format", `${"mp3"}`);
  }, [flac, m4a, mp3]);

  const handleSetOpen = () => {
    setOpen(!open);
  };

  const handleMetadataSwitch = () => {
    setMetadata(!metadata);
  };

  const handleSoundSwitch = () => {
    setSound(!sound);
  };

  const handleSetMP3 = () => {
    if (!mp3) setMP3(true);
    setFLAC(false);
    setM4A(false);
  };

  const handleSetM4A = () => {
    if (!m4a) setM4A(true);
    setMP3(false);
    setFLAC(false);
  };

  const handleSetFLAC = () => {
    if (!flac) setFLAC(true);
    setMP3(false);
    setM4A(false);
  };

  const handleTrimSwitch = () => {
    if (trim) {
      setStartMin("");
      setStartSecs("");
      setEndMin("");
      setEndSecs("");
    }
    setTrim(!trim);
  };

  const handleNotifSwitch = () => {
    if (!notif) {
      if (!("Notification" in window)) {
        alert("Browser does not support notifications");
        setNotif(false);
      } else if (Notification.permission === "granted") {
        setNotif(true);
      } else if (Notification.permission === "denied") {
        alert(
          "Allow notifications for YTiz in your browser permissions to enable browser-wide notifications",
        );
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setNotif(true);
          } else setNotif(false);
        });
      }
    } else setNotif(false);
  };

  const handleStartMinChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const parsedValue = parseInt(newValue, 10);
    const clampedValue = Math.max(0, Math.min(59, parsedValue));
    if (clampedValue) {
      setStartMin(clampedValue.toString());
    } else {
      setStartMin("");
    }
  };
  const handleStartSecsChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const parsedValue = parseInt(newValue, 10);
    const clampedValue = Math.max(0, Math.min(59, parsedValue));
    if (clampedValue) {
      setStartSecs(clampedValue.toString());
    } else {
      setStartSecs("");
    }
  };
  const handleEndMinChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const parsedValue = parseInt(newValue, 10);
    const clampedValue = Math.max(0, Math.min(59, parsedValue));
    if (clampedValue) {
      setEndMin(clampedValue.toString());
    } else {
      setEndMin("");
    }
  };
  const handleEndSecsChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const parsedValue = parseInt(newValue, 10);
    const clampedValue = Math.max(0, Math.min(59, parsedValue));
    if (clampedValue) {
      setEndSecs(clampedValue.toString());
    } else {
      setEndSecs("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownload(true);
    setDLState("Searching for Audio...");
    props.downloadCallback(true);
    let filename = "";
    let randID = 0;
    let startTime = 0;
    let endTime = 0;
    let format = "mp3";
    if (m4a) format = "m4a";
    if (flac) format = "flac";
    startTime += startMin ? parseInt(startMin) * 60 : 0;
    startTime += startSecs ? parseInt(startSecs) : 0;
    endTime += endMin ? parseInt(endMin) * 60 : 0;
    endTime += endSecs ? parseInt(endSecs) : 0;
    const parts = link.split("list=");
    const url = parts[0] || link;
    try {
      let notification;
      const infoResponse = await fetch(`${baseFetchURL}/api/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          startTime: startTime,
          endTime: endTime,
          format: format,
        }),
      });
      const previewInfo = await infoResponse.json();
      if (previewInfo["error"]) {
        toast.error(previewInfo["error"]);
        if (notif) notification = new Notification(previewInfo["error"]);
        if (sound) errorSound();
        props.downloadCallback(false);
        setDownload(false);
        setDLState("");
        return;
      } else {
        setDLState("Converting Data... (Please Wait)");
        setThumbnailURL(previewInfo["thumbnail"]);
        setTitle(previewInfo["title"]);
        setAuthor(previewInfo["author"]);
        setInfoProcessed(true);
        filename = previewInfo["filename"];
        randID = previewInfo["randID"];
        endTime = previewInfo["endTime"];
        const response = await fetch(`${baseFetchURL}/api/download`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
            quality: selectedQuality,
            metadata: metadata,
            filename: filename,
            randID: randID,
            trim: trim,
            startTime: startTime,
            endTime: endTime,
            format: format,
          }),
        });
        const data = await response.json();

        if (!data["filename"] && !data["filepath"] && data["error"]) {
          toast.error(data["error"]);
          if (notif) notification = new Notification(data["error"]);
          if (sound) errorSound();
          props.downloadCallback(false);
          setDownload(false);
          setDLState("");
        } else {
          const filename = data["filename"];
          const filepath = data["filepath"];
          const randID = data["randID"];
          setDLState(`Downloading File:`);
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
          if (sound) successSound();
          toast.success(
            `${filename.replace(`temporary_${randID}/`, "")} has been successfully downloaded!`,
          );
          const { error } = await supabase
            .from("Downloads")
            .update({
              count: parseInt(cumulativeDLCount.replace(/,/g, "")) + 1,
            })
            .eq("count", parseInt(cumulativeDLCount.replace(/,/g, "")));
          if (error) console.log(error);
          if (notif)
            notification = new Notification(
              `${filename.replace(`temporary_${randID}/`, "")} has been successfully downloaded!`,
            );
          setDownloadCount((downloadCount) => downloadCount + 1);
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
            className="mb-2 rounded-full border-none bg-slate-600 bg-opacity-25 py-9 pl-10 pr-20 text-xl font-bold text-text outline-none backdrop-blur-sm placeholder:font-bold focus:bg-slate-500 focus:bg-opacity-30 focus:outline-none focus:placeholder:text-slate-400"
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
            className={`pointer-events-none absolute mb-2 select-none rounded-full border-2 ${props.colorTheme === "violet" ? "border-violet-400" : props.colorTheme === "blue" ? "border-blue-400" : props.colorTheme === "green" ? "border-green-400" : props.colorTheme === "rose" ? "border-rose-400" : "border-orange-400"} bg-transparent py-9 pl-10 pr-20 text-xl font-bold text-transparent outline-none`}
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
          <Dialog open={openDonate} onOpenChange={setOpenDonate}>
            <DialogContent className="absolute max-w-md rounded-3xl border-0 bg-slate-800 bg-opacity-50 outline-none backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-3xl font-extrabold text-text">
                  You've used YTiz {downloadCount} times!
                </DialogTitle>
                <DialogDescription className="text-center font-semibold text-text opacity-60">
                  If you've found the site to be useful, I would really
                  appreciate a donation to help me keep it running. Thanks!
                </DialogDescription>
              </DialogHeader>
              <a
                className="group mx-auto mt-6 flex w-3/4 justify-center rounded-3xl bg-violet-900 px-5 py-3 text-base font-semibold text-gray-100 transition-all duration-100 hover:scale-105 hover:bg-violet-700 hover:drop-shadow-small_glow"
                href="https://ko-fi.com/tizerk"
                target="_blank"
              >
                Support Me on Ko-fi!
                <img
                  src={Kofi}
                  className="pl-3 transition-all duration-150 group-hover:rotate-12"
                  alt="Ko-fi Icon"
                />
              </a>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="mx-auto mt-5 rounded-full border-0 bg-transparent text-gray-500 outline-0 ring-0 hover:bg-transparent hover:text-gray-300"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div>
            {isDesktop ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mt-8"
                    ref={settingsButton}
                  >
                    <Button className="w-full select-none rounded-full border-none bg-slate-600 bg-opacity-25 font-bold outline-none backdrop-blur-sm">
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
                      className={`pointer-events-none absolute inset-0 w-full select-none rounded-full border-2 ${props.colorTheme === "violet" ? "border-violet-400" : props.colorTheme === "blue" ? "border-blue-400" : props.colorTheme === "green" ? "border-green-400" : props.colorTheme === "rose" ? "border-rose-400" : "border-orange-400"} bg-slate-800 font-bold outline-none`}
                    >
                      Settings
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent
                  ref={settingsDialog}
                  className="absolute max-w-80 border-none bg-slate-800 bg-opacity-50 backdrop-blur-[4px]"
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
                    className={`pointer-events-none absolute inset-0 z-0 select-none rounded-2xl border-2 ${props.colorTheme === "violet" ? "border-violet-400" : props.colorTheme === "blue" ? "border-blue-400" : props.colorTheme === "green" ? "border-green-400" : props.colorTheme === "rose" ? "border-rose-400" : "border-orange-400"} ${props.colorTheme === "violet" ? "bg-[#222143]" : props.colorTheme === "blue" ? "bg-[#1d304cdd]" : props.colorTheme === "green" ? "bg-[#18413765]" : props.colorTheme === "rose" ? "bg-[#42181889]" : "bg-[#3d2c176f]"} bg-opacity-90 outline-none`}
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
                    <Label className="bg-text bg-clip-text text-center text-base font-extrabold text-transparent">
                      Format
                    </Label>
                    <div className="mb-4 mt-2 flex w-full flex-row items-center justify-center">
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-l-lg border-2 border-r-[1px] font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetM4A}
                        pressed={m4a}
                      >
                        M4A
                      </Toggle>
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-none border-2 font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetMP3}
                        pressed={mp3}
                      >
                        MP3
                      </Toggle>
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-r-lg border-2 border-l-[1px] font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetFLAC}
                        pressed={flac}
                      >
                        FLAC
                      </Toggle>
                    </div>
                    <div className="mb-4 flex flex-row items-center justify-between">
                      <Popover open={openQuality} onOpenChange={setOpenQuality}>
                        <Label
                          htmlFor="qualityPopover"
                          className="bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                        >
                          Quality
                        </Label>
                        <PopoverTrigger
                          className="border-[3px] bg-input_bot text-text hover:bg-input_top hover:text-text"
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
                        <PopoverContent className="w-full border-2 bg-input_bot text-right backdrop-blur-md">
                          <Command value={selectedQuality}>
                            <CommandList>
                              <CommandGroup>
                                {qualities.map((quality) => (
                                  <CommandItem
                                    className={`cursor-pointer ${props.colorTheme === "violet" ? "aria-selected:bg-violet-600" : props.colorTheme === "blue" ? "aria-selected:bg-blue-600 " : props.colorTheme === "green" ? "aria-selected:bg-green-600 " : props.colorTheme === "rose" ? "aria-selected:bg-rose-600 " : "aria-selected:bg-orange-600 "} text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"}`}
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
                    <div className="flex w-full flex-col items-center gap-5">
                      <div className="flex w-full flex-row justify-between">
                        <TooltipProvider>
                          <Tooltip delayDuration="500">
                            <TooltipTrigger className="text-text">
                              <Label
                                className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                                htmlFor="metadata-toggle"
                              >
                                Embed Metadata
                              </Label>
                            </TooltipTrigger>
                            <ToggleSwitch
                              colorTheme={props.colorTheme}
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
                                <br />
                                <strong>Disabled</strong> - No metadata embedded
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <TooltipProvider>
                          <Tooltip delayDuration="500">
                            <TooltipTrigger className="text-text">
                              <Label
                                className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                                htmlFor="trim-toggle"
                              >
                                Trim Download
                              </Label>
                            </TooltipTrigger>
                            <ToggleSwitch
                              colorTheme={props.colorTheme}
                              label=""
                              id="trim-toggle"
                              checked={trim}
                              onCheckedChange={handleTrimSwitch}
                            />
                            <TooltipContent
                              className="m-auto w-3/5"
                              side="bottom"
                            >
                              <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                                <strong>Enabled</strong> - Trims audio to
                                specified timecodes, up to 5 minutes in duration
                                <br />
                                <br />
                                <strong>Disabled</strong> - Downloads full audio
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex w-full flex-row justify-around">
                        <div className="flex flex-row">
                          <input
                            className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                            type="text"
                            disabled={!trim}
                            value={startMin}
                            placeholder="00"
                            maxLength="2"
                            onChange={(e) => handleStartMinChange(e)}
                          />
                          <span className="text-2xl font-bold leading-none text-text">
                            :
                          </span>
                          <input
                            className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                            type="text"
                            disabled={!trim}
                            value={startSecs}
                            placeholder="00"
                            maxLength="2"
                            onChange={(e) => handleStartSecsChange(e)}
                          />
                        </div>
                        <div className="text-text">
                          <p>---</p>
                        </div>
                        <div className="flex flex-row">
                          <input
                            className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                            type="text"
                            disabled={!trim}
                            value={endMin}
                            placeholder="00"
                            maxLength="2"
                            onChange={(e) => handleEndMinChange(e)}
                          />
                          <span className="text-2xl font-bold leading-none text-text">
                            :
                          </span>
                          <input
                            className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                            type="text"
                            disabled={!trim}
                            value={endSecs}
                            placeholder="00"
                            maxLength="2"
                            onChange={(e) => handleEndSecsChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-6 h-[.1px] w-full bg-text opacity-30"></div>
                      <div className="flex w-full flex-row justify-between">
                        <TooltipProvider>
                          <Tooltip delayDuration="500">
                            <TooltipTrigger className="text-text">
                              <Label
                                className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                                htmlFor="sound-toggle"
                              >
                                Sound
                              </Label>
                            </TooltipTrigger>
                            <ToggleSwitch
                              colorTheme={props.colorTheme}
                              label=""
                              id="sound-toggle"
                              checked={sound}
                              onCheckedChange={handleSoundSwitch}
                            />
                            <TooltipContent
                              className="m-auto w-full"
                              side="bottom"
                            >
                              <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                                <strong>Enabled</strong> - Plays audible alerts
                                on download/error
                                <br />
                                <br />
                                <strong>Disabled</strong> - YTiz plays no sound
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <TooltipProvider>
                          <Tooltip delayDuration="500">
                            <TooltipTrigger className="text-text">
                              <Label
                                className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                                htmlFor="notif-toggle"
                              >
                                Browser Notifications
                              </Label>
                            </TooltipTrigger>
                            <ToggleSwitch
                              colorTheme={props.colorTheme}
                              label=""
                              id="notif-toggle"
                              checked={notif}
                              onCheckedChange={handleNotifSwitch}
                            />
                            <TooltipContent
                              className="m-auto w-1/2"
                              side="bottom"
                            >
                              <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                                <strong>Enabled</strong> - Sends browser-wide
                                notifications when downloads finish or encounter
                                errors
                                <br />
                                <br />
                                <strong>Disabled</strong> - Only alerts on the
                                page itself
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <Button
                        className="rounded-full bg-gray-800 hover:hover:bg-gray-600 hover:bg-opacity-35"
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
                    <Button className="w-full rounded-full border-none bg-slate-900 font-bold outline-none backdrop-blur-sm">
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
                      className={`pointer-events-none absolute inset-0 w-full select-none rounded-full border-2 ${props.colorTheme === "violet" ? "border-violet-400" : props.colorTheme === "blue" ? "border-blue-400" : props.colorTheme === "green" ? "border-green-400" : props.colorTheme === "rose" ? "border-rose-400" : "border-orange-400"} bg-slate-900 font-bold outline-none`}
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
                    <DrawerHeader className="mb-2">
                      <DrawerTitle className="text-xl font-semibold text-text">
                        Edit Settings
                      </DrawerTitle>
                      <DrawerDescription className="text-sm font-normal min-[425px]:text-lg">
                        Adjust your download settings here.
                      </DrawerDescription>
                    </DrawerHeader>
                    <Label className="bg-text bg-clip-text text-center text-base font-extrabold text-transparent">
                      Format
                    </Label>
                    <div className="mb-8 mt-2 flex w-full flex-row items-center justify-center">
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-l-lg border-2 border-r-[1px] font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetM4A}
                        pressed={m4a}
                      >
                        M4A
                      </Toggle>
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-none border-2 font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetMP3}
                        pressed={mp3}
                      >
                        MP3
                      </Toggle>
                      <Toggle
                        variant="outline"
                        className={`w-1/3 rounded-r-lg border-2 border-l-[1px] font-bold text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"} hover:text-white ${props.colorTheme === "violet" ? "data-[state=on]:bg-violet-600" : props.colorTheme === "blue" ? "data-[state=on]:bg-blue-600" : props.colorTheme === "green" ? "data-[state=on]:bg-green-600" : props.colorTheme === "rose" ? "data-[state=on]:bg-rose-600" : "data-[state=on]:bg-orange-600"} data-[state=on]:text-text`}
                        onClick={handleSetFLAC}
                        pressed={flac}
                      >
                        FLAC
                      </Toggle>
                    </div>
                    <div className="mb-8 flex flex-row items-center justify-between">
                      <Popover open={openQuality} onOpenChange={setOpenQuality}>
                        <Label
                          htmlFor="qualityPopover"
                          className="bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                        >
                          Quality
                        </Label>
                        <PopoverTrigger
                          className="border-[3px] bg-input_bot text-text hover:bg-gray-400 hover:bg-opacity-35 hover:text-text"
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
                        <PopoverContent className="w-full border-2 bg-slate-500 bg-opacity-10 text-right backdrop-blur-md">
                          <Command value={selectedQuality}>
                            <CommandList>
                              <CommandGroup>
                                {qualities.map((quality) => (
                                  <CommandItem
                                    className={`text-text ${props.colorTheme === "violet" ? "aria-selected:bg-violet-600" : props.colorTheme === "blue" ? "aria-selected:bg-blue-600 " : props.colorTheme === "green" ? "aria-selected:bg-green-600 " : props.colorTheme === "rose" ? "aria-selected:bg-rose-600 " : "aria-selected:bg-orange-600 "} text-text ${props.colorTheme === "violet" ? "hover:bg-violet-900" : props.colorTheme === "blue" ? "hover:bg-blue-900" : props.colorTheme === "green" ? "hover:bg-green-900" : props.colorTheme === "rose" ? "hover:bg-rose-900" : "hover:bg-orange-900"}`}
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
                              className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="metadata-toggle"
                            >
                              Embed Metadata
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            colorTheme={props.colorTheme}
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
                    <div className="mt-6 flex w-full flex-row justify-between">
                      <TooltipProvider>
                        <Tooltip delayDuration="500">
                          <TooltipTrigger className="text-text">
                            <Label
                              className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="trim-toggle"
                            >
                              Trim Download
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            colorTheme={props.colorTheme}
                            label=""
                            id="trim-toggle"
                            checked={trim}
                            onCheckedChange={handleTrimSwitch}
                          />
                          <TooltipContent
                            className="m-auto w-3/5"
                            side="bottom"
                          >
                            <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                              <strong>Enabled</strong> - Trims audio to
                              specified timecodes, up to 5 minutes in duration
                              <br />
                              <br />
                              <strong>Disabled</strong> - Downloads full audio
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="mt-4 flex w-full flex-row justify-around">
                      <div className="flex flex-row">
                        <input
                          className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                          type="text"
                          disabled={!trim}
                          value={startMin}
                          placeholder="00"
                          maxLength="2"
                          onChange={(e) => handleStartMinChange(e)}
                        />
                        <span className="text-2xl font-bold leading-none text-text">
                          :
                        </span>
                        <input
                          className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                          type="text"
                          disabled={!trim}
                          value={startSecs}
                          placeholder="00"
                          maxLength="2"
                          onChange={(e) => handleStartSecsChange(e)}
                        />
                      </div>
                      <div className="text-text">
                        <p>---</p>
                      </div>
                      <div className="flex flex-row">
                        <input
                          className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                          type="text"
                          disabled={!trim}
                          value={endMin}
                          placeholder="00"
                          maxLength="2"
                          onChange={(e) => handleEndMinChange(e)}
                        />
                        <span className="text-2xl font-bold leading-none text-text">
                          :
                        </span>
                        <input
                          className="h-6 w-7 rounded-sm border-2 bg-transparent text-right text-xl text-text disabled:border-gray-600"
                          type="text"
                          disabled={!trim}
                          value={endSecs}
                          placeholder="00"
                          maxLength="2"
                          onChange={(e) => handleEndSecsChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-10 mt-8 h-[.1px] w-full bg-text opacity-30"></div>
                    <div className="mb-8 flex w-full flex-row justify-between">
                      <TooltipProvider>
                        <Tooltip delayDuration="500">
                          <TooltipTrigger className="text-text">
                            <Label
                              className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="sound-toggle"
                            >
                              Sound
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            colorTheme={props.colorTheme}
                            label=""
                            id="sound-toggle"
                            checked={sound}
                            onCheckedChange={handleSoundSwitch}
                          />
                          <TooltipContent
                            className="m-auto w-full"
                            side="bottom"
                          >
                            <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                              <strong>Enabled</strong> - Plays audible alerts on
                              download/error
                              <br />
                              <br />
                              <strong>Disabled</strong> - YTiz plays no sound
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="mb-4 flex w-full flex-row justify-between">
                      <TooltipProvider>
                        <Tooltip delayDuration="500">
                          <TooltipTrigger className="text-text">
                            <Label
                              className="cursor-pointer bg-text bg-clip-text text-center text-base font-extrabold text-transparent"
                              htmlFor="notif-toggle"
                            >
                              Browser Notifications
                            </Label>
                          </TooltipTrigger>
                          <ToggleSwitch
                            colorTheme={props.colorTheme}
                            label=""
                            id="notif-toggle"
                            checked={notif}
                            onCheckedChange={handleNotifSwitch}
                          />
                          <TooltipContent
                            className="m-auto w-1/2"
                            side="bottom"
                          >
                            <p className="bg-gradient-to-b from-text to-text_fade bg-clip-text">
                              <strong>Enabled</strong> - Sends browser-wide
                              notifications when downloads finish or encounter
                              errors
                              <br />
                              <br />
                              <strong>Disabled</strong> - Only alerts on the
                              page itself
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <DrawerFooter>
                      <Button
                        className="w-2/3 rounded-full bg-gray-800 hover:bg-gray-600 hover:bg-opacity-35"
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
        <Toaster offset={"45px"} position="bottom-right" />
      </div>
    </>
  );
}
export default LinkInput;
