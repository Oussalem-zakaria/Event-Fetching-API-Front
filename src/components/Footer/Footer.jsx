const FooterList = (props) => {
  return (
    <>
      <ul className="flex flex-col space-y-1">
        {props.children}
      </ul>
    </>
  );
};

const FooterElement = (props) => {
    return (
        <>
            <li className="cursor-pointer hover:text-slate-400">
                {props.children}
            </li>
        </>
    )
}

export {FooterElement, FooterList};
