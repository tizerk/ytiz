function Change(props) {
  return (
    <div>
      <h3 className="mb-3 ml-1 text-sm font-semibold min-[420px]:text-sm min-[420px]:font-semibold sm:ml-5 sm:text-2xl">
        {props.header}
      </h3>
      <ul className="mb-10 ml-5 list-disc text-sm sm:text-base">
        {props.features.map((feature, index) => (
          <li className="mb-2" key={index}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Change;
