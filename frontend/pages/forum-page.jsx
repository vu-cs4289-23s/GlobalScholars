import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import CityPost from "../components/forum/city/city-post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { getForumDataByName } from "../redux/geo/geo-slice.js";

export default function ForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { programInfo, locationInfo } = useSelector((state) => state.geo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  const [city, setCity] = useState("City");
  const [country, setCountry] =  useState("Country");
  const [description, setDescription] =  useState("This is my description");
  const [tags, setTags] = useState(["Tag One", "Tag Two", "Tag Three", "Tag Four", "Tag Five"]);
  const [overallRate, setOverallRate] = useState(0);
  const [safetyRate, setSafetyRate] = useState(0);
  const [affordableRate, setAffordableRate] = useState(0);
  const [sightsRate, setSightsRate] = useState(0);

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

  useEffect(() => {
    dispatch(getForumDataByName(name));
  }, [name]);

  useEffect(() => {
    // Set Location data
    if (locationInfo && locationInfo !== []) {
      setCity(locationInfo.city);
      setCountry(locationInfo.country);
      setDescription(locationInfo.description);
      setTags(locationInfo.top_tags);
      setOverallRate(locationInfo.overall_rating);
      setSafetyRate(locationInfo.safety_rating);
      setAffordableRate(locationInfo.affordability_rating);
      setSightsRate(locationInfo.sightseeing_rating);
    }
  }, [locationInfo]);

  console.log(locationInfo);

  return (
    <div id="forum-page" className="flex h-screen w-screen bg-blue-200">
      <div className="overflow-y-hidden">
        <SideBar />
      </div>
      <div className="bg-blue-200">
        <img
          className="flex h-1/4 w-screen object-center object-cover"
          src="/landing-locations/copenhagen.jpeg"
        />
        {/*src="../../frontend/assets/landing-page-locations/{locationInfo[0].city}.jpg"*/}
        <CityDescription
          description={description}
          city={city}
          country={country}
          top_tags={tags}
          overall_rating={overallRate}
          safety_rating={safetyRate}
          affordability_rating={affordableRate}
          sightseeing_rating={sightsRate}
        />
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
