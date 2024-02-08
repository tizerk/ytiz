function Change(props) {
  return (
    <div>
      <h3 className="mb-3 ml-1 text-sm font-semibold min-[420px]:text-sm min-[420px]:font-semibold sm:ml-5 sm:text-2xl">
        {props.header}
      </h3>
      <p className="text-lg italic sm:text-xl">New Features</p>
      <ul className="mb-3 ml-5 list-disc text-sm sm:text-base">
        {props.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="text-lg italic sm:text-xl">Known Issues</p>
      <ul className="mb-3 ml-5 list-disc text-sm sm:text-base">
        {props.issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
    </div>
  );
}

export default Change;
