import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/all-pages/sidebar";
import Map from "../components/price-estimator/map";
import Card from "../components/price-estimator/trip-card"
import TabbedFolder from "../components/price-estimator/trip-folder";
import DateSelector from "../components/price-estimator/date-dropdown";
import { ImSearch } from "react-icons/im";
import LocationDropDown from "../components/price-estimator/location-dropdown";

const tabs = [
  { title: 'My Trips' },
  { title: 'Explore' },
];

export default function PriceEstimator() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction());
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

    <div id="price-estimator" className="flex h-screen w-screen">
      <SideBar />

    {/* page contents */}
    <div class="overflow-x-hidden">

      {/* header bar */}
      <div class=" grid-row grid-col flex w-screen h-1/8 font-bold font-mono text-4xl ml-32 mt-16 text-center  text-black">
          Where would you like to travel?
      </div>
      <div class=" grid-row flex w-screen ml-36 h-1/6 absolutefont-bold  text-2xl font-mono p-4 text-black">
          <div class=" grid-col flex w-1/3 p-8 ml-6 z-30 text-black">
              FROM:<LocationDropDown />
              TO:<LocationDropDown/>
          </div>
          <div class=" grid-col flex p-8 text-black">
            START:<DateSelector/>
            END:<DateSelector/>
          </div>
          <div class=" grid-col flex  p-8 ml-6 text-black">
            <ImSearch size={36} />
          </div>
      </div>

      <div class="grid-row  w-screen ml-32 h-2/3 absolutefont-bold font-mono z-0 text-black">
          <Map/>
      </div>

      <div class="grid-row flex w-screen overflow-y-scroll h-2/3 absolutefont-bold font-mono p-4  text-black">
      <TabbedFolder tabs={tabs} card={<Card />} />
      </div>

      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
   </div>   
   
  </div>
  );
}
