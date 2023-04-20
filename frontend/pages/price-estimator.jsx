import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserAsyncAction, logoutAction } from '../redux/user/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../components/all-pages/sidebar';
import MapContainer from '../components/price-estimator/map-container';
import Card from '../components/price-estimator/card';
import TabbedFolder from '../components/price-estimator/trip-folder';
import DateSelector from '../components/price-estimator/date-dropdown';
import { ImSearch } from 'react-icons/im';
import LocationDropDown from '../components/price-estimator/location-dropdown';
import { getAllTrips } from '../redux/trip/trip-slice';
import Footer from '../components/all-pages/footer';
import { getAllLocationsAsyncAction } from '../redux/geo/geo-slice';

const tabs = [{ title: 'My Trips' }, { title: 'Explore' }];

export default function PriceEstimator() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { locationInfo, loading } = useSelector((state) => state.geo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useParams();
  const logOutHandle = () => {
    dispatch(logoutAction());
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (success && !loggedIn) {
      navigate('/login');
    }
    if (loggedIn === false && userInfo.username !== '') {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);
  const [destination, setDestination] = useState({
    country: 'United States',
    longitude: -95.712891,
    latitude: 37.09024,
  });

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [search, setSearch] = useState(false);
  const Search = () => {
    setSearch(true);

    dispatch(
      getAllTrips({
        destination: destination.country,
        start_date: new Date(start).getTime(),
        end_date: new Date(end).getTime(),
      })
    );
  };

  useEffect(() => {
    if (locationInfo[0] === undefined) {
      dispatch(getAllLocationsAsyncAction());
    }
  }, [locationInfo]);

  useEffect(() => {
    if (city !== undefined) {
      //set from euqal to the longitude and latitude cooridnates from locqationInfo object
      for (let i = 0; i < locationInfo.length; i++) {
        if (locationInfo[i].city === city) {
          setDestination({
            city: locationInfo[i].city,
            longitude: locationInfo[i].longitude,
            latitude: locationInfo[i].latitude,
          });
        }
      }
    }
  }, [city, locationInfo]);

  return (
    <div
      id="price-estimator"
      className="flex h-screen max-h-[100vh] w-screen  bg-blue-light"
    >
      <SideBar />

      {/* page contents */}
      <div className="flex flex-col w-full h-full  ">
        {/* header bar */}
        <h2 className="text-center my-8  text-2xl md:text-5xl font-bold text-black">
          Where would you like to travel?
        </h2>
        <div className=" flex flex-col  md:flex-row align-middle md:h-24  items-center justify-center font-bold text-lg md:text-2xl font-mono m-8 text-black">
          <div className=" flex px-4 h-12 z-30 justify-center text-black">
            DESTINATION:
            <LocationDropDown
              selected={destination}
              setSelected={setDestination}
            />
          </div>
          <div className=" flex h-12 min-w-64  justify-center text-black z-10">
            START:
            <DateSelector selected={start} setSelectedDate={setStart} />
          </div>
          <div className=" flex h-12 min-w-64 justify-center text-black z-10">
            END:
            <DateSelector selected={end} setSelectedDate={setEnd} />
          </div>
          <div className="flex h-12 items-center z-10">
            <button className="flex font-bold" onClick={() => Search()}>
              <p>Search</p>
              <ImSearch size={25} className="ml-2" />
            </button>
          </div>
          {/* <div className="flex pt-4 justify-center text-black cursor-pointer">
            
          </div> */}
        </div>
        <div className="flex flex-col sm:flex-row  justify-center gap-2 px-4 min-h-[50vh] md:h-full">
          <MapContainer
            destination={destination}
            setDestination={setDestination}
          />

          <TabbedFolder tabs={tabs} search={search} setSearch={setSearch} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
