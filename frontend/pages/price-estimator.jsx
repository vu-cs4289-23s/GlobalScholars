import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserAsyncAction, logoutAction } from '../redux/user/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../components/all-pages/sidebar';
import MapContainer from '../components/price-estimator/map-container';
import Card from '../components/price-estimator/trip-card';
import TabbedFolder from '../components/price-estimator/trip-folder';
import DateSelector from '../components/price-estimator/date-dropdown';
import { ImSearch } from 'react-icons/im';
import LocationDropDown from '../components/price-estimator/location-dropdown';
import { getAllTrips } from '../redux/trip/trip-slice';

const tabs = [{ title: 'My Trips' }, { title: 'Explore' }];

export default function PriceEstimator() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (success && !loggedIn) {
      navigate('/login');
    }
    if (loggedIn === false && userInfo.username !== '') {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);
  const [from, setFrom] = useState({
    longitude: -122.4194,
    latitude: 37.7749,
    city: 'San Francisco',
  });
  const [to, setTo] = useState({
    longitude: -122.4194,
    latitude: 37.7749,
    city: 'San Francisco',
  });

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const Search = (arg) => {
    dispatch(
      getAllTrips({
        destination: to.city,
        startDate: start,
        endDate: end,
      })
    );
  };
  return (
    <div id="price-estimator" className="flex h-screen w-screen">
      <SideBar />

      {/* page contents */}
      <div class="overflow-x-hidden w-screen">
        {/* header bar */}
        <div class=" grid-row grid-col flex w-screen h-1/8 font-bold font-mono text-4xl ml-4 mt-16 text-center  text-black">
          Where would you like to travel?
        </div>
        <div class=" grid-row flex w-screen h-1/6 absolutefont-bold text-2xl font-mono p-4 text-black">
          <div class=" grid-col flex w-1/4 p-8 ml-6 z-30 text-black">
            DESTINATION:
            <LocationDropDown selected={from} setSelected={setFrom} />
          </div>
          <div class=" grid-col  flex p-8 text-black">
            START:
            <DateSelector selected={start} setSelectedDate={setStart} />
            END:
            <DateSelector selected={end} setSelectedDate={setEnd} />
          </div>
          <div class=" grid-col flex p-8 ml-6 text-black">
            <ImSearch size={36} onClick={Search} />
          </div>
        </div>
        <div className="ml-40 w-4/5 h-4/5 ">
          <MapContainer from={from} to={to} setFrom={setFrom} />
        </div>

        <div class="grid-row flex w-screen overflow-y-scroll h-2/3 absolutefont-bold font-mono p-4 text-black">
          <TabbedFolder tabs={tabs} card={<Card />} />
        </div>

        <div className="absolute right-1 top-2">
          <button onClick={() => logOutHandle()}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

