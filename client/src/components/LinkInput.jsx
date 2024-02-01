import Spinner from "../components/Spinner";
import { useState } from "react";

function LinkInput() {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("OK");
  const [download, setDownload] = useState(false);
  const baseFetchURL = import.meta.env.PROD
    ? import.meta.env.VITE_fetch_url
    : import.meta.env.VITE_dev_url;
  const handleSubmit = async (e) => {
    setDownload(true);
    setErrorMessage("OK");
    e.preventDefault();
    const response = await fetch(`${baseFetchURL}/api/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    });
    response
      .json()
      .then(async (data) => {
        if (!data["filename"] && !data["filepath"] && data["error"]) {
          setErrorMessage(data["error"]);
          setDownload(false);
        } else {
          const filename = data["filename"];
          const filepath = data["filepath"];
          await fetch(`${baseFetchURL}/api/file_send`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filepath: filepath,
            }),
          })
            .then((response) => response.blob())
            .then((blob) => {
              const downloadUrl = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.download = filename.replace("temporary/", "");
              link.click();
              URL.revokeObjectURL(downloadUrl);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(function () {
      setDownload(false);
    }, 500);
  };
  return (
    <>
      <div className="w-[80%]">
        <form onSubmit={handleSubmit}>
          <div className="flex max-w-[100%] flex-row justify-center">
            <input
              className="mr-3 w-1/2 rounded-l-full rounded-r-[3rem] border-2 border-[var(--very-dark-magenta)] px-12 py-8 text-2xl font-bold outline-none focus:bg-[var(--focus)] focus:text-[var(--background)] focus:placeholder:font-bold focus:placeholder:text-[var(--background)]"
              type="url"
              id="url"
              name="url"
              placeholder="Enter URL Here..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              disabled={!link}
              className="min-w-[15rem] rounded-r-full border-none bg-[var(--primary)] p-8 text-[1.8rem] font-bold text-[var(--text)] outline-none hover:cursor-pointer hover:shadow-lg hover:shadow-[var(--shadow)] disabled:bg-[var(--secondary)] disabled:text-[#929292] disabled:hover:cursor-not-allowed disabled:hover:shadow-none"
              type="submit"
            >
              Submit
            </button>
          </div>
          {
            <p
              className={`${
                errorMessage !== "OK" ? "visible" : "invisible"
              } mx-auto my-0 mt-8 block max-w-[80%] text-center text-2xl font-bold`}
              style={{ color: "red" }}
            >
              {errorMessage}
            </p>
          }
          <div
            className={`${
              download ? "visible" : "invisible"
            } mt-12 flex items-center justify-center`}
          >
            {<Spinner />}
          </div>
        </form>
      </div>
    </>
  );
}
export default LinkInput;
