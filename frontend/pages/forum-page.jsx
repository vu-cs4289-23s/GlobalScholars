import SideBar from "../components/all-pages/sidebar";

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
<<<<<<< HEAD
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2" >
        <div className="w-[15%] "><SideBar/></div>
        <div className= "w-[85%]">
          <div className="flex h-1/4 justify-center text-4xl bg-blue-600"> Profile Header </div>

          <div className="flex h-3/4 justify-center text-4xl bg-white"> Profile Contents </div>
        </div>  
      </div>
    
=======
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
      <SideBar />
      <div className="w-screen">
        <div className="flex h-1/4 justify-center text-4xl bg-blue-600">
          Forum Header
        </div>

        <div className="flex h-3/4 justify-center text-4xl bg-white">
          Forum Contents
        </div>
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
>>>>>>> a2113bb7767578187a44255d331cbc1f69c86a36
  );
}
