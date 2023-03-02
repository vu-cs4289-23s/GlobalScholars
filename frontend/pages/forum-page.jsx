import SideBar from "../components/all-pages/sidebar";
import CityDescription from "../components/forum/city/city-description.jsx";
import CityPost from "../components/forum/city/city-post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import {
  getForumDataByName,
  getAllLocationsAsyncAction,
  getAllProgramsAsyncAction,
} from "../redux/geo/geo-slice.js";
import axios from "axios";

export default function ForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { programInfo, locationInfo } = useSelector((state) => state.geo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  const [city, setCity] = useState("City");
  const [country, setCountry] = useState("Country");
  const [description, setDescription] = useState("This is my description");
  const [tags, setTags] = useState([
    "Tag One",
    "Tag Two",
    "Tag Three",
    "Tag Four",
    "Tag Five",
  ]);
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
    if (name !== undefined) {
      dispatch(getForumDataByName(name));
    } else {
      dispatch(getAllLocationsAsyncAction());
      dispatch(getAllProgramsAsyncAction());
    }
  }, [name]);

  return (
    <div id="forum-page" className="flex h-screen w-screen bg-blue-200">
      <div className="overflow-y-hidden">
        <SideBar />
      </div>
      <div className="bg-blue-200">
        <img
          className="flex h-1/4 w-screen object-center object-cover"
          src="copenhagen-forum-photo.png"
        />
        {Object.keys(locationInfo).length !== 0
          ? Object.keys(locationInfo).map((key) => {
              return (
                <div key={key}>
                  <CityDescription
                    city={locationInfo[key].city}
                    country={locationInfo[key].country}
                    description={locationInfo[key].description}
                    top_tags={locationInfo[key].top_tags}
                    overall_rating={locationInfo[key].overall_rating}
                    safety_rating={locationInfo[key].safety_rating}
                    affordability_rating={
                      locationInfo[key].affordability_rating
                    }
                    sightseeing_rating={locationInfo[key].sightseeing_rating}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
