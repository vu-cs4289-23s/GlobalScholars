import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/all-pages/sidebar";

import Map from "../components/price-estimator/map";

import LocationDropDown from "../components/price-estimator/location-dropdown";


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
      <div class=" grid-row grid-col flex w-screen h-1/8 font-bold font-mono text-4xl ml-4 mt-16 text-center  text-black">
          Where would you like to travel?
      </div>
      <div class=" grid-row flex w-screen ml-32 h-1/6 absolutefont-bold font-mono p-4 text-black">
          <div class=" grid-col flex w-1/3  bg-gray-200 text-black">
          <LocationDropDown />
          </div>
          <div class=" grid-col flex w-1/3 bg-gray-300 text-black">
            dates
          </div>
          <div class=" grid-col flex   bg-gray-400 text-black">
            search icon
          </div>
      </div>

      <div class="grid-row  w-screen ml-32 h-2/3 absolutefont-bold font-mono  text-black">
        <Map/>
      </div>

      <div class="grid-row flex w-screen overflow-y-scroll h-2/3 bg-gray-500 absolutefont-bold font-mono p-4 text-black">
          FOLDER
      </div>

      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
   </div>   
   
  </div>
  );
}



// <div class="grid grid-cols-4 gap-4">
// <div class="col-span-2 bg-blue-200 rounded-md p-4">
// from
// </div>

// <div class="col-span-2 bg-green-200 rounded-md p-4">
// <input type="text" class="w-full" placeholder="Start" />
// </div>

// <div class="col-span-2 bg-blue-200 rounded-md p-4">
// to
// </div>
// <div class="col-span-2 bg-green-200 rounded-md p-4">
// <input type="text" class="w-full" placeholder="End" />
// </div>
// </div>


{/* <div className="w-full overflow-y-scroll">
        <div id="price-estimator-header" className="flex h-1/3 ml-5 text-4xl">
          <div className="font-bold font-mono p-5 text-black mb-4">Where would you like to travel?</div>
        </div>
      </div> */}





        //   {/* destination/dates row */}
        //   <div class="flex col-span-3 h-1/4 grid grid-cols-3 gap-4">
        //   <div class="col-span-1 bg-gray-200 p-4">
        //     location dropdowns
        //   </div>
        //   <div class="col-span-1 bg-gray-300 p-4">
        //     date selectors
        //   </div>
        //   <div class="col-span-1 bg-gray-400 p-4">
        //     search icon
        //   </div>
        // </div>
        
        // {/* map element */}
        // <div class="col-span-1  w-screen bg-gray-200 p-4">
        //   Row 3, Column 1 Row 3, Column 1 Row 3, Column 1 Row 3, Column 1 Row 3, Column 1 Row 3, Column 1 Row 3, Column 1 Row 3, Column 1
        // </div>
  
        // {/* trip folder */}
        // <div class="col-span-1  w-screen bg-gray-300 p-4">
        //   Row 4, Column 1
        // </div>