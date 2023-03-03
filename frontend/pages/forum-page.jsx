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

  const [location, setLocation] = useState({
    city:  "City",
    country: "Country",
    description: "This is my city description",
    programs: [],
    top_tags: [
      "Tag One",
      "Tag Two",
      "Tag Three",
      "Tag Four",
      "Tag Five"
    ],
    overall_rating: 0,
    safety_rating: 0,
    affordability_rating: 0,
    sightseeing_rating: 0,
    image_link: "",   // TODO -- add location image links to DB
    like_cnt: 0,
  });

  // TODO -- make forum dynamic for programs
  const [program, setProgram] = useState({
    program_name: "Program",
    description: "This is my program description",
    location: [],
    top_tags: [
      "Tag One",
      "Tag Two",
      "Tag Three",
      "Tag Four",
      "Tag Five"
    ],
    overall_rating: 0,
    safety_rating: 0,
    affordability_rating: 0,
    sightseeing_rating: 0,
    image_link: "",
    like_cnt: 0,
  });

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

  useEffect(() => {
    // Set Location data
    if (locationInfo && locationInfo.city !== "") {
      setLocation({
        city:  locationInfo.city,
        country: locationInfo.country,
        description: locationInfo.description,
        top_tags: locationInfo.top_tags,
        overall_rating: locationInfo.overall_rating,
        safety_rating: locationInfo.safety_rating,
        affordability_rating: locationInfo.affordability_rating,
        sightseeing_rating: locationInfo.sightseeing_rating,
        image_link: locationInfo.image_link,
        like_cnt: locationInfo.like_cnt,
      });
    }
  }, [locationInfo]);

  useEffect(() => {
    // Set Program data
    if (programInfo && programInfo.program_name !== "") {
      setProgram({
        program_name: programInfo.program_name,
        description: programInfo.description,
        location: programInfo.location,
        top_tags: programInfo.top_tags,
        overall_rating: programInfo.overall_rating,
        safety_rating: programInfo.safety_rating,
        affordability_rating: programInfo.affordability_rating,
        sightseeing_rating: programInfo.sightseeing_rating,
        image_link: programInfo.image_link,
        like_cnt: programInfo.like_cnt,
      });
    }
  }, [programInfo]);

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
          description={location.description}
          city={location.city}
          country={location.country}
          top_tags={location.top_tags}
          overall_rating={location.overall_rating}
          safety_rating={location.safety_rating}
          affordability_rating={location.affordability_rating}
          sightseeing_rating={location.sightseeing_rating}
        />
        {/*{Object.keys(locationInfo).length !== 0*/}
        {/*  ? Object.keys(locationInfo).map((key) => {*/}
        {/*      return (*/}
        {/*        <div key={key}>*/}
        {/*          <CityDescription*/}
        {/*            city={locationInfo[key].city}*/}
        {/*            country={locationInfo[key].country}*/}
        {/*            description={locationInfo[key].description}*/}
        {/*            top_tags={locationInfo[key].top_tags}*/}
        {/*            overall_rating={locationInfo[key].overall_rating}*/}
        {/*            safety_rating={locationInfo[key].safety_rating}*/}
        {/*            affordability_rating={*/}
        {/*              locationInfo[key].affordability_rating*/}
        {/*            }*/}
        {/*            sightseeing_rating={locationInfo[key].sightseeing_rating}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    })*/}
        {/*  : null}*/}
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
