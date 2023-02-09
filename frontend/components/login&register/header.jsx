import passportIcon from "../../assets/passport-icon.svg";
import { Link } from "react-router-dom";

const Header = () => {
  // make a header component
  //link to register page
  return (
    <div className="flex justify-between">
      <div className="flex">
        <img src={passportIcon} alt="passport" className="flex" width={80} />
        <h1 className="text-4xl pl-2 font-bold text-white">GlobalScholars</h1>
      </div>
      <div></div>
      <div>
        <div>
          <Link
            to="/register"
            className="text-white text-lg font-bold underline hover:text-slate-300 cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
