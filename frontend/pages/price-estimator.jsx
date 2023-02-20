import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/all-pages/sidebar";

export default function PriceEstimator() {
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
    <div
      id="price-estimator"
      className="flex w-screen h-screen sm:grid-cols-1 grid-cols-2"
    >
      <SideBar />
      <div className="w-full">
        <div
          id="price-estimator-header"
          className="flex h-1/4 justify-center text-4xl bg-blue-600"
        >
          Price Estimator Header
        </div>
        <div
          id="price-estimator-body"
          className="flex h-3/4 justify-center text-4xl bg-white"
        >
          Price Estimator Contents
        </div>
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
