import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, getUserAsyncAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import images from "../../images";
import ScrollingImages from "../components/all-pages/scrolling-images";

import { getLocationByNameAsyncAction } from "../redux/geo/geo-slice.js";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success, userInfo } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const logOutHandle = () => {
    dispatch(logoutAction());
  };
  useEffect(() => {
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  // //dynamic array to hold program images & names (will be populated on a click of a location)
  // const [programImages, setProgramImages] = useState([]);
  //
  // //bool state that displays programs or hides them depending on location clicked
  // const [showPrograms, setShowPrograms] = useState("");
  // useEffect(() => {
  //   //fetch data here
  // }, [showPrograms]);

  return (
    <div id="forum-page" className="flex h-screen ">
      <SideBar />
      <div className="overflow-y-scroll">
        <div className="flex flex-col h-1/2 bg-[url('/landing-background.avif')] bg-no-repeat bg-cover justify-end">
          <div className="grid  m-10 p-10 gap-2">
            <div className="flex h-2/3 justify-center text-4xl font-bold font-mono text-white mb-3">
              Study Abroad Search
            </div>
            <div className="flex h-1/2 justify-center items-bottom text-4xl">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="grid bg-white w-[85vw] ">
          <div className="flex flex-row h-2 p-5 w-[85vw] text-2xl">
            Programs By Location:
          </div>

          {/* locations  */}
          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            ScrollingImages
          </div>

          {/* programs popout  */}
          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            ScrollingImages
          </div>
        </div>
      </div>

      {loggedIn ? (
        <div className="absolute right-1 top-2">
          <button onClick={() => logOutHandle()}>Log Out</button>
        </div>
      ) : (
        <div className="absolute right-1 top-2">
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      )}
    </div>
  );
}
