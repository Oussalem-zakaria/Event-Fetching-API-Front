const Buttons = (props) => {
  return (
    <>
      <button
        type="submit"
        className={`${props.bg} ${props.text} rounded-md font-semibold border ${props.border} ${props.hoverBg} ${props.hoverText} ${props.hoverBorderColor} ${props.px} ${props.py} ${props.additionClass}`}
      >
        {props.children}
      </button>
    </>
  );
};

export default Buttons;
