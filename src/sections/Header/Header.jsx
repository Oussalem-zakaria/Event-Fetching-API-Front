import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import HeaderContainer from "../../components/Header/HeaderContainer";
import { Link } from "react-router-dom";

const Header = () => {

  const [menuDisplay, setManuDisplay] = useState(false);

  return (
    <nav id="header">
      <div className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <h1 className="text-sky-800 text-3xl font-medium leading-8 tracking-tight my-auto">
              Moroccan Events
            </h1>
          </Link>
        </div>
        <div className="justify-between lg:flex space-x-6 hidden items-center">
          <HeaderContainer />
        </div>

        <div className="lg:hidden">
          <button onClick={() => setManuDisplay(!menuDisplay)}>
            {menuDisplay === true ? <FaXmark className="text-3xl text-black" /> : <FaBars className="text-3xl text-black" />}
          </button>
        </div>

      </div>
      <div className="container mx-auto px-6 py-4">
        <div className={`relative flex ${menuDisplay === true ? "" : "hidden"} flex-col space-y-6 mx-auto items-center bg-white text-secondColor rounded-lg py-9 px-10 lg:hidden`}>
          <HeaderContainer />
        </div>
      </div>
    </nav>
  );
};

export default Header;
