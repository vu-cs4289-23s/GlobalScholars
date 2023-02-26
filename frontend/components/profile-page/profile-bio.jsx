import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/user/user-slice";
import { useNavigate } from "react-router-dom";

const ProfileBio = () => {
  const { userInfo, loggedIn, success, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleLogOut = () => dispatch(logoutAction({}));

  return (
    <div
      className={`w-screen h-full sm:w-full flex justify-center bg-[url('https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover bg-no-repeat`}
    >
      <div
        className="bg-[rgba(39,74,104,0.5)] flex flex-col sm:flex-row  w-[90%] h-[75%] relative top-8 rounded-full"
        id="border"
      >
        <div className="flex justify-center " id="header-contents">
          <div className="flex sm:m-2 ">
            <img
              src={userInfo.avatar_url}
              alt="avatar"
              className=" w-24 h-24 rounded-full  "
            />
          </div>
        </div>

        <div
          className="flex text-sm w-full flex-col align-middle absolute sm:static  justify-center  h-full"
          id="profile-body "
        >
          <div className="flex text-xs md:text-base text-left relative left-8  leading-4">
            <p className=" font-bold text-slate-200 w-[60px] md:w-[80px]">
              Username:
            </p>
            <p className="text-slate-200 pl-2">{userInfo.username}</p>
          </div>
          <div className="flex text-xs md:text-base text-left relative left-8  leading-4 ">
            <p className=" font-bold text-slate-200 w-[60px] md:w-[80px]">
              Name:
            </p>
            <p className="text-slate-200 pl-2">
              {capitalizeFirstLetter(userInfo.first_name)}{" "}
              {capitalizeFirstLetter(userInfo.last_name)}
            </p>
          </div>
          <div className="flex text-xs md:text-base text-left relative left-8  leading-4 ">
            <p className=" font-bold text-slate-200 w-[60px] md:w-[80px]">
              Majors:{" "}
            </p>
            <p className="text-slate-200 pl-2">
              {userInfo.majors ? userInfo.majors.join(" & ") : ""}
            </p>
          </div>
          <div className="flex text-xs md:text-base text-left relative left-8  leading-4 ">
            <p className=" font-bold text-slate-200 w-[60px] md:w-[80px]">
              Minors:{" "}
            </p>
            <p className="text-slate-200 pl-2">
              {userInfo.minors ? userInfo.minors.join(" & ") : ""}
            </p>
          </div>
          <div className="flex text-xs md:text-base text-left  relative left-8  leading-4">
            <p className=" font-bold text-slate-200 w-[60px] md:w-[80px]">
              Bio:{" "}
            </p>
            <p className=" text-slate-200 pl-2">{userInfo.bio}</p>
          </div>
        </div>
        <div className="absolute right-10 top-2">
          <p
            className="text-slate-200 text-xs md:text-base hover:underline hover:font-bold cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </p>
          <p
            className="text-slate-200 text-xs md:text-base hover:underline hover:font-bold cursor-pointer"
            onClick={() => navigate(`/profile/${userInfo.username}/edit`)}
          >
            Edit
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
