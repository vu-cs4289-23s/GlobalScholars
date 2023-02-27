import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import CityPost from "../components/forum/city/city-post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { getForumDataByName }  from "../redux/geo/geo-slice.js";
import axios from "axios";

export default function ForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { programInfo, locationInfo } = useSelector((state)  => state.geo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();

  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };

  useEffect(() => {
    if (success && !loggedIn) {
      navigate("/login");
    }
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  useEffect(() => {
    dispatch(getForumDataByName(name));
  }, [name]);

  return (
    <div id="forum-page" className="flex h-screen w-screen bg-blue-200">
      <div>
        <SideBar />
      </div>

      <div className="bg-blue-200">
        <img className="flex h-1/4 w-screen object-center object-cover" src="../../frontend/assets/copenhagen-forum-photo.png" />
        <CityDescription
          description={locationInfo.length > 0 ? locationInfo[0].description : "This location does not exist."}
          city={locationInfo.length > 0 ? locationInfo[0].city : "N/a"}
          country={locationInfo.length > 0 ? locationInfo[0].country : "N/a"}
        />
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
