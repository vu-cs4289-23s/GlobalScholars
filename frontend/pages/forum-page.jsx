import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";


export default function ForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
        <SideBar />
      <div className="w-[85%]">
        <img className="flex h-1/4 w-screen object-center object-cover" src="frontend/assets/copenhagen-forum-photo.png" />
        <div className=" flex h-3/4 text-4xl bg-blue-200"></div>
      </div>
      <div className="absolute top-52 w-[85%] left-[15%]">
        <CityDescription />
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>

      </div>

  );
}
