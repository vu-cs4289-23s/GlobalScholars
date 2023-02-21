<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> a2113bb7767578187a44255d331cbc1f69c86a36
import passportIcon from "../../assets/passport-icon.svg";
import speechBubbleIcon from "../../assets/speechbubble-icon.svg";
import saveIcon from "../../assets/save-icon.svg";
import calculatorIcon from "../../assets/calculator-icon.svg";
import profileIcon from "../../assets/userProfile-icon.svg";
<<<<<<< HEAD


const SideBar = () => {
    //state management (what states will we need?)
    return (
        <div className = "flex flex-col p-2 h-screen gap-4 bg-sky-800">

            {/* logo  */}
            <div className="flex justify-center h-[25%] text-white text-lg indent-1">
                <img
                src = {passportIcon}
                alt="password"
                className="flex mt-8"
                width={110}>
                </img>
                     
        
            </div>

            {/* links */}
            <div className= "grid  m-3 h-[20%]  gap-5 grid-rows-4">
                <div className= "flex   align-left text-2xl indent-2">
                    <img src = {speechBubbleIcon} width={40}/>
                    <a className=" text-white font-bold hover:underline" href="/forum-page">Search </a>
                </div>
                <div className= "flex   align-left text-2xl indent-3">
                    <img src = {saveIcon} width={40}/>
                    <a className=" text-white font-bold hover:underline" href="/profile-page">Saved </a>
                </div>
                <div className= "flex  align-left text-2xl indent-3">
                    <img src = {calculatorIcon} width={40} />
                    <a className=" text-white font-bold hover:underline" href="/price-estimator">Calculator </a>
                </div>
                <div className= "flex   align-left text-2xl indent-2">
                    <img src = {profileIcon} width={40}/>
                    <a className=" text-white font-bold hover:underline" href="/profile-page">My Profile </a>
                </div>
            </div>

            {/* blank space */}
            <div className="h-[55%]">
            </div>

        </div>
    )
}

export default SideBar;
=======
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
    <div className="flex flex-row sm:flex-col p-2 h-24 w-screen sm:h-screen sm:w-64 absolute sm:relative bottom-0 gap-4 bg-sky-800">
      {/* logo  */}
      <div className="w-full sm:flex justify-center  text-white text-lg indent-1 hidden sm:visible">
        <img
          src={passportIcon}
          alt="password"
          className="flex mt-8"
          width={110}
        ></img>
      </div>

      {/* links */}
      <div className="w-full flex sm:grid justify-between m-4  sm:gap-8">
        <NavLink
          className=" text-white font-bold hover:underline sm:flex left-0"
          to="/landing"
        >
          <img src={searchIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-right p-2">
            Search
          </p>
        </NavLink>
        <NavLink
          className=" text-white font-bold hover:underline sm:flex"
          to="/forum"
        >
          <img src={speechBubbleIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-middle p-2">
            Forum
          </p>
        </NavLink>
        <NavLink
          className=" text-white font-bold hover:underline sm:flex"
          to="/price-estimator"
        >
          <img src={calculatorIcon} width={40} />
          <p className="invisible sm:visible text-sm sm:text-xl text-right p-2">
            Calculator
          </p>
        </NavLink>
        <NavLink
          className="text-white font-bold hover:underline sm:flex"
          to={`/profile/${userInfo.username}`}
        >
          <img
            src={userInfo.avatar_url}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm invisible sm:visible sm:text-xl text-right p-2">
            Profile
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
>>>>>>> a2113bb7767578187a44255d331cbc1f69c86a36
