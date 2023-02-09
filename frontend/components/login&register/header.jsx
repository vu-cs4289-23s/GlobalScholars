import passportIcon from "../../assets/passport-icon.svg";
import { Link } from "react-router-dom";

const Header = () => {
  // make a header component
  //link to register page
  return (
    <div className="flex justify-between">
      <div>
        <img src={passportIcon} alt="passport" className="flex" width={80} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white">GlobalScholars</h1>
      </div>
      <div>
        <h1 className="text-lg font-bold text-white underline hover:text-slate-300 cursor-pointer">
          <Link to="/register">Register</Link>
        </h1>
      </div>
    </div>
  );
};

export default Header;
