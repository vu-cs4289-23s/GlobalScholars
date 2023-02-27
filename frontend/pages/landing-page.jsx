import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, getUserAsyncAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollingImages from "../components/all-pages/scrolling-images.jsx";
import images from "../../images.js";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success, userInfo } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  useEffect(() => {
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  //dynamic array to hold program images & names (will be populated on a click of a location)
  const [programImages, setProgramImages] = useState([]);

  //bool state that displays programs or hides them depending on location clicked
  const [showPrograms, setShowPrograms] = useState("");
  useEffect(() => {
    //fetch data here
  }, [showPrograms]);

  return (
    <div id="forum-page" className="flex h-screen ">
      <SideBar />
      <div className="w- h-full ">
        <div className="flex flex-col  h-1/3 bg-[url('/landing-background.avif')] bg-no-repeat bg-cover overflow-x-hidden">
          <div className="grid  m-10 p-10 gap-2">
            <div className="flex h-2/3 justify-center items-center text-4xl font-bold font-mono text-white">
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

          {/* displayed locations  */}
          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            <ScrollingImages rounded={true} images={images} />
          </div>

          {/* programs popout  */}
          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            <ScrollingImages images={images} />
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
