import passportIcon from "../../assets/passport-icon.svg";
import { Link } from "react-router-dom";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex cursor-pointer" onClick={() => navigate("/")}>
        <img src={passportIcon} alt="passport" className="flex" width={80} />
        <h1 className="text-4xl pl-2 font-bold text-white">GlobalScholars</h1>
      </div>
      <div></div>
      <div>
        <div>
          {pathname === "/login" ? (
            <Link
              to="/register"
              className="text-white text-lg font-bold underline hover:text-slate-300 cursor-pointer"
            >
              Register
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg font-bold underline hover:text-slate-300 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
