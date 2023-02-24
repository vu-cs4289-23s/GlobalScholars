import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileBio = () => {
  const { userInfo, loggedIn, success, loading } = useSelector(
    (state) => state.user
  );

  return (
    <div
      className={`w-full h-full flex flex-row bg-[url('https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-no-repeat bg-cover`}
    >
      <div
        className="flex justify-center relative  bg-[rgba(39,74,104,0.5)] "
        id="profile-header"
      >
        <img
          src={userInfo.avatar_url}
          alt="avatar"
          className="w-20 h-20 rounded-full align-middle justify-center flex  absolute m-8"
        />
      </div>

      <div
        className="flex text-sm w-full  bg-[rgba(39,74,104,0.5)] h-full"
        id="profile-body "
      >
        <div className="flex flex-col text-sm sm:text-md text-left text-white relative top-8">
          <p className=" font-bold">Username: </p>
          <p className=" font-bold">Name: </p>
          <p className=" font-bold">Majors: </p>
          <p className=" font-bold">Minors: </p>
          <p className=" font-bold">Bio: </p>
        </div>
        <div className="flex flex-col text-sm sm:text-md pl-2 text-left  text-slate-800 relative top-8">
          <p className=" font-bold">{userInfo.username}</p>
          <p className=" font-bold">
            {userInfo.first_name} {userInfo.last_name}
          </p>
          <p className=" font-bold">{userInfo.majors.join(" & ")}</p>
          <p className=" font-bold">{userInfo.minors.join(" & ")}</p>
          <p className=" font-bold">{userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
