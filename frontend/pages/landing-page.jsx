import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, getUserAsyncAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  useEffect(() => {
    if (username !== null && username !== undefined && loggedIn === false) {
      dispatch(getUserAsyncAction(username));
    }
  }, [username, loggedIn]);
  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
      <div className="">
        <SideBar />
      </div>
      <div className="w-full">
        <div className="flex flex-col  bg-[url('/landing-background.avif')] bg-no-repeat bg-cover">
          <div className="grid  m-10 p-10 gap-2">
            <div className="flex h-1/2 justify-center items-center text-4xl">
              Study Abroad Search
            </div>
            <div className="flex h-1/2 justify-center items-bottom text-4xl">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="flex h-2/3 justify-center text-4xl bg-white">
          {" "}
          Landing Contents{" "}
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
