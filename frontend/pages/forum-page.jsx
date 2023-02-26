import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { getForumDataByName }  from "../redux/geo/geo-slice.js";

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
        <CityDescription />
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );



}
