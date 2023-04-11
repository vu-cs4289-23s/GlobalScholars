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
      <div className="relative bg-light-gray rounded-3xl mx-4 text-left pt-2 pb-6 px-4">

        <div className="flex grid-cols-1 sm:grid-cols-2">
          {/* column 1 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-rows-2 ">
            {/* profile picture */}
            <div className=" ml-4 p-4">
              <img
                  src={userInfo.avatar_url}
                  alt="avatar"
                  className=" sm:w-[128px] sm:h-[128px] rounded-full justify-center border-white border-4"
              />
            </div>
            {/* edit button */}
            <div className="mt-2 mx-auto">
              <p
                  className="mt-2 text-xs md:text-base hover:underline hover:font-bold cursor-pointer"
                  onClick={() => navigate(`/profile/${userInfo.username}/edit`)}
              >
                Edit
              </p>
            </div>
          </div>
          {/* column 2 */}
          <div className=" col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-rows-3 gap-1 text-left">
            {/* name and username */}
            <div className="ml-4 top-2">
              <p className="text-4xl mt-4 font-bold">
                {capitalizeFirstLetter(userInfo.first_name)}{" "}
                {capitalizeFirstLetter(userInfo.last_name)}
              </p>
              <p className=" text-lg pt-2">
                @{userInfo.username}
              </p>
            </div>

            {/* major minors */}
            <div className="px-4 p-2 ">
              <p className=" text-lg">
                <b>Major(s):</b> {userInfo.majors ? userInfo.majors.join(" & ") : ""}
              </p>
              <p className=" text-lg">
                <b>Minor(s):</b>  {userInfo.minors ? userInfo.minors.join(" & ") : ""}
              </p>
            </div>

            {/* user bio */}
            <div className="px-4 p-2 flex flex-col justify-between">
              <p className=" text-lg">
                {userInfo.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileBio;
