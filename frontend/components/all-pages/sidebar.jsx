import passportIcon from "../../assets/passport-icon.svg";
import speechBubbleIcon from "../../assets/speechbubble-icon.svg";
import saveIcon from "../../assets/save-icon.svg";
import calculatorIcon from "../../assets/calculator-icon.svg";
import profileIcon from "../../assets/userProfile-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { userInfo, userToken, loading, success } = useSelector(
    (state) => state.user
  );
  //state management (what states will we need?)
  return (
    <div className="flex flex-col p-2 h-screen gap-4 bg-sky-800">
      {/* logo  */}
      <div className="flex justify-center h-[25%] text-white text-lg indent-1">
        <img
          src={passportIcon}
          alt="password"
          className="flex mt-8"
          width={110}
        ></img>
      </div>

      {/* links */}
      <div className="grid  m-3 h-[20%]  gap-5 grid-rows-4">
        <div className="flex   align-left text-2xl indent-2">
          <img src={searchIcon} width={40} />
          <NavLink
            className=" text-white font-bold hover:underline"
            to="/landing"
          >
            Search{" "}
          </NavLink>
        </div>
        <div className="flex   align-left text-2xl indent-3">
          <img src={speechBubbleIcon} width={40} />
          <NavLink
            className=" text-white font-bold hover:underline"
            to="/forum"
          >
            Forum{" "}
          </NavLink>
        </div>
        <div className="flex  align-left text-2xl indent-3">
          <img src={calculatorIcon} width={40} />
          <NavLink
            className=" text-white font-bold hover:underline"
            to="/price-estimator"
          >
            Calculator{" "}
          </NavLink>
        </div>
        <div className="flex   align-left text-2xl indent-2">
          <img src={profileIcon} width={40} />
          <NavLink
            className=" text-white font-bold hover:underline"
            to={`/profile/${userInfo.username}`}
          >
            My Profile{" "}
          </NavLink>
        </div>
      </div>

      {/* blank space */}
      <div className="h-[55%]"></div>
    </div>
  );
};

export default SideBar;
