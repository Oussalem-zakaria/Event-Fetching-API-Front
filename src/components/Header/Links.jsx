const Links = (props) => {
  return (
    <>
      <a
        href="/#"
        className="text-slate-800 font-semibold hover:text-sky-800 transition duration-500 ease-in-out lg:text-slate-800"
      >
        {props.children}
      </a>
    </>
  );
};

export default Links;
