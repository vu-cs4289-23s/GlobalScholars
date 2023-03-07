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
      className={`w-screen h-full sm:w-full flex justify-center bg-[url('/landing-background.avif')] bg-center bg-cover bg-no-repeat overflow-hidden`}
    >
      {/* <div
        className="bg-[rgba(39,74,104,0.7)] flex flex-col sm:flex-row  w-[70%] h-[75%] relative top-8 rounded-3xl"
        id="border"> */}

        {/* two columns- one for photo, one for information */}
        <div class="flex grid-cols-1 sm:grid-cols-2 gap-4 h-[75%] relative top-8 rounded-3xl bg-[rgba(39,74,104,0.7)]">
          <div class="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-rows-2 ">
            {/* profile picture */}
            <div class=" ml-4 p-4">
            <img
              src={userInfo.avatar_url}
              alt="avatar"
              className=" sm:w-[128px] sm:h-[128px] rounded-full justify-center "
            />
            </div>
            {/* edit button */}
            <div class="mt-12 ml-4">
              <p
              className="text-slate-200 mt-2 text-xs md:text-base hover:underline hover:font-bold cursor-pointer"
              onClick={() => navigate(`/profile/${userInfo.username}/edit`)}
              >
              Edit
              </p>
            </div>
          </div>

          <div class=" col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-rows-5 gap-1 text-left">
            {/* name */}
            <div class="ml-4 top-2">
              <p className="text-slate-200 text-md mt-2 font-bold">
                {capitalizeFirstLetter(userInfo.first_name)}{" "}
                {capitalizeFirstLetter(userInfo.last_name)}
              </p>
            </div>

            {/* username */}
            <div class=" p-4 top-4">
              <p className=" text-slate-200 text-sm">
                Username: {userInfo.username}
              </p>
            </div>

            {/* major minors */}
           <div class="p-4 ">
              <p className=" text-slate-200 text-sm">
                Major/Minor: {userInfo.majors ? userInfo.majors.join(" & ") : ""} /  {userInfo.minors ? userInfo.minors.join(" & ") : ""}
              </p>
            </div>

            {/* user bio */}
            <div class="p-4">
              <p className=" text-slate-200 text-sm">
              About: {userInfo.bio}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProfileBio;
