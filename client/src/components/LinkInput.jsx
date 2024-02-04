import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ToggleSwitch from "./ToggleSwitch";

function LinkInput() {
  const [link, setLink] = useState("");
  const [hqMode, SetHqMode] = useState(true);
  const [download, setDownload] = useState(false);
  const baseFetchURL = import.meta.env.PROD
    ? import.meta.env.VITE_fetch_url
    : import.meta.env.VITE_dev_url;
  const handleHqSwitch = () => {
    SetHqMode(!hqMode);
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
        body: JSON.stringify({ url: link, quality: hqMode }),
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
        toast.success(`${filename} has been successfully downloaded!`);
      }
      setDownload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[80%]">
        <form onSubmit={handleSubmit}>
          <div className="flex max-w-[100%] flex-row justify-center">
            <Input
              className="mr-3 w-1/2 rounded-l-full rounded-r-[3rem] border-2 px-12 py-8 text-2xl font-bold outline-none focus:text-[var(--background)] focus:placeholder:font-bold focus:placeholder:text-[var(--background)]"
              type="url"
              id="url"
              name="url"
              placeholder="Enter URL Here..."
              value={link}
              disabled={download}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              variant="outline"
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
          </div>
          <div className="mt-4">
            <ToggleSwitch
              label="High Quality Mode"
              id="hq-toggle"
              checked={hqMode}
              onCheckedChange={handleHqSwitch}
            />
          </div>
        </form>
        <Toaster offset={"45px"} richColors position="bottom-center" />
      </div>
    </>
  );
}
export default LinkInput;
