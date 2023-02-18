import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
      <div className="w-[15%] ">
        <SideBar />
      </div>
      <div className="w-[85%]">
        <div className="flex flex-col h-1/3  bg-blue-600">
          <div className="grid  m-3 p-10 gap-2">
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
