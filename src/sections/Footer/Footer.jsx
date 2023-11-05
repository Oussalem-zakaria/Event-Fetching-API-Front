import fb from "../../assets/imgs/icons/facebook.avif";
import insta from "../../assets/imgs/icons/instagram.avif";
import twitter from "../../assets/imgs/icons/twitter.avif";
import linkdin from "../../assets/imgs/icons/linkedin.avif";
import {
  FooterElement,
  FooterList,
} from "../../components/Footer/Footer";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bg-slate-900 py-6 px-6">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-center md:justify-start">
              <a href="/#">
                <h1 className="text-sky-100 text-3xl font-medium leading-8 tracking-tight my-auto">
                Moroccan Events
                </h1>
              </a>
            </div>
            <div className="text-center py-6 flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 md:items-center md:py-10">
              <h4 className="text-white font-semibold text-lg">Suivez nous:</h4>
              <ul className="flex gap-4 justify-center">
                <li>
                  <a href="">
                    <img src={fb} alt="" srcSet="" className="w-12" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={insta} alt="" srcSet="" className="w-12" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={twitter} alt="" srcSet="" className="w-12" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={linkdin} alt="" srcSet="" className="w-12" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-6 text-white">
              <hr className="pb-3" />
              <div className="text-center ">
                <h4>&copy; Copyright resirvée à moroccanevents.fr</h4>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
