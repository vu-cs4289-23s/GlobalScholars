import passportIcon from "../../assets/passport-icon.svg";
import speechBubbleIcon from "../../assets/speechbubble-icon.svg";
import saveIcon from "../../assets/save-icon.svg";
import calculatorIcon from "../../assets/calculator-icon.svg";
import profileIcon from "../../assets/userProfile-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import GlobalScholar from "../../assets/GlobalScholar-logo.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAsyncAction } from "../../redux/user/user-slice";

const SideBar = () => {
  const { userInfo, loggedIn, userToken, loading, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (success && !loggedIn) {
      navigate("/login");
    }
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [success, loggedIn, userInfo]);
  //state management (what states will we need?)
  return (
    <div className="flex flex-row sm:flex-col p-6 h-24 sm:h-full sm:w-64 w-full fixed sm:sticky   bottom-0 gap-4 bg-sky-800 z-10">
      {/* logo  */}
      <div
        className="w-full sm:flex justify-center  text-white text-lg indent-1 hidden sm:visible"
        onClick={() => navigate("/")}
      >
        <img
          src={GlobalScholar}
          alt="logo"
          className="flex mr-3.5"
          width={150}
          height={150}
        ></img>
      </div>

      {/* links */}
      <div className="w-full flex sm:grid justify-between m-4  sm:gap-8">
        <div
          className=" text-white font-bold  sm:flex hover:cursor-pointer"
          onClick={() => navigate("/landing")}
        >
          <img src={searchIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-right p-2 hover:text-blue-300 hover:underline underline-offset-4">
            Search
          </p>
        </div>
        <div
          className=" text-white font-bold  sm:flex hover:cursor-pointer"
          onClick={() => navigate("/forum")}
        >
          <img src={speechBubbleIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-middle p-2 hover:text-blue-300 hover:underline underline-offset-4">
            Forum
          </p>
        </div>
        <div
          className=" text-white font-bold sm:flex hover:cursor-pointer"
          onClick={() => navigate("/price-estimator")}
        >
          <img src={calculatorIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-right p-2 hover:underline hover:text-sky-300 underline-offset-4">
            Calculator
          </p>
        </div>
        <div
          className="text-white font-bold sm:flex hover:cursor-pointer"
          onClick={() => navigate(`/profile/${userInfo.username}`)}
        >
          <img
            src={userInfo.avatar_url}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm invisible sm:visible sm:text-xl text-right p-2 hover:underline hover:text-sky-300 underline-offset-4">
            Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
