function DownloadPreview(props) {
  return (
    <div className="mb-4 flex flex-col items-center justify-center">
      <img
        className="mb-4 h-16 rounded-2xl min-[460px]:h-20 sm:h-28"
        src={props.thumbnail}
        alt="Download Thumbnail"
      />
      <h3 className="text-center text-base font-bold text-text">
        {props.title.substring(0, 100)}
      </h3>
      <p className="text-center text-sm font-semibold text-text">
        {props.author.substring(0, 35)}
      </p>
    </div>
  );
}

export default DownloadPreview;
