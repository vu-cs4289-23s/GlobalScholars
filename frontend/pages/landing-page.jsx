import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, getUserAsyncAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState} from "react";
import ScrollingImagesRounded from "../components/all-pages/rounded-scrolling-images";
import ScrollingImagesSquare from "../components/all-pages/square-scrolling-images";

import {getLocationByNameAsyncAction}  from "../redux/geo/geo-slice.js";





export default function LandingPage() {


  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success, userInfo } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  useEffect(() => {
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  //get all landing pages into images 
  var images = [{name: "Barcelona, Spain",  src: "frontend/images/landing-locations/barcelona.jpg"},
      {name: "Copenhagen, Denmark", src: "frontend/images/landing-locations/copenhagen.jpeg"}, 
      {name: "Edinburgh, Scotland", src: "frontend/images/landing-locations/edinburgh.jpeg"},
      {name: "Florence, Italy", src:"frontend/images/landing-locations/florence.jpeg"},
      {name: "Glasgow, Scotland", src:"frontend/images/landing-locations/glasgow.jpeg"},
      {name: "London, United Kingdom", src:"frontend/images/landing-locations/london.jpeg"},
      {name: "Madrid, Spain", src:"frontend/images/landing-locations/madrid.jpeg"},
      {name: "Paris, France", src:"frontend/images/landing-locations/paris.jpeg"},
      {name: "Rome, Italy", src:"frontend/images/landing-locations/rome.jpeg"},
      {name: "Seville, Spain", src:"frontend/images/landing-locations/seville.jpeg"},
      {name: "Stockholm, Sweden", src:"frontend/images/landing-locations/stockholm.jpeg"},
      {name: "Prague, Czech Republic", src:"frontend/images/landing-locations/prague.jpeg"},
      {name: "Budapest, Hungary", src:"frontend/images/landing-locations/budapest.jpeg"},
      {name: "Amsterdam, Netherlands", src:"frontend/images/landing-locations/Amsterdam, Netherlands.jpeg"},
      {name: "Belfast, United Kingdom", src: "frontend/images/landing-locations/Belfast, United Kingdom.jpeg"},
      {name: "Belgrade, Serbia", src:"frontend/images/landing-locations/Belgrade, Serbia.jpeg"},
      {name: "Berlin, Germany", src:"frontend/images/landing-locations/Berlin, Germany.jpeg"},
      {name: "Bremen, Germany", src:"frontend/images/landing-locations/Bremen, Germany.jpeg"},
      {name: "Cork, Ireland", src:"frontend/images/landing-locations/Cork, Ireland.jpeg"},
      {name: "Dublin, Ireland", src:"frontend/images/landing-locations/Dublin, Ireland.jpeg"},
      {name: "Freiburg, Germany", src:"frontend/images/landing-locations/Freiburg, Germany.jpeg"},
      {name: "Galway, Ireland", src:"frontend/images/landing-locations/Galway, Ireland.jpeg"},
      {name: "Geneva, Switzerland", src:"frontend/images/landing-locations/Geneva, Switzerland.jpg"},
      {name: "Granada, Spain", src:"frontend/images/landing-locations/Granada, Spain.jpeg"},
      {name: "Haifa, Israel", src:"frontend/images/landing-locations/Haifa, Israel.jpeg"},   
      {name: "Jerusalem, Israel", src:"frontend/images/landing-locations/Jerusalem, Israel.jpeg"},
      {name: "Leeds, United Kingdom", src:"frontend/images/landing-locations/Leeds, United Kingdom.jpeg"},
      {name: "Metz, France", src:"frontend/images/landing-locations/Metz, France.jpeg"},
      {name: "Milano, Italy", src:"frontend/images/landing-locations/Milano, Italy.jpeg"},
      {name: "Palma, Spain", src:"frontend/images/landing-locations/Palma, Spain.jpeg"},
      {name: "Siena, Italy", src:"frontend/images/landing-locations/Siena, Italy.jpeg"},
      {name: "St Andrews, United Kingdom", src:"frontend/images/landing-locations/St Andrews, United Kingdom.jpeg"},
      {name: "Stirling, United Kingdom", src:"frontend/images/landing-locations/Stirling, United Kingdom.jpeg"},
      {name: "el Aviv, Israel", src:"frontend/images/landing-locations/Tel Aviv, Israel.jpeg"},
      {name: "Toulouse, France", src:"frontend/images/landing-locations/Toulouse, France.jpeg"},
      {name: "Turin, Italy", src:"frontend/images/landing-locations/Turin, Italy.jpeg"},
      {name: "York, United Kingdom", src:"frontend/images/landing-locations/York, United Kingdom.jpeg"},]
      
  const {locationInfo} = useSelector((state)  => state.geo);

  const onImageClick = (event, name) => {
    console.log(event);
    console.log(name);
    // setShowPrograms(name);
    console.log(name.split(",")[0].toLowerCase())
    dispatch(getLocationByNameAsyncAction(name.split(",")[0].toLowerCase()))

    const programs = locationInfo.programs;
  }
 
    //dynamic array to hold program images & names (will be populated on a click of a location)
    const [programImages, setProgramImages] = useState([]);

    //bool state that displays programs or hides them depending on location clicked
    const [showPrograms, setShowPrograms] = useState("");
    useEffect(() =>{
      //fetch data here
    }, [showPrograms])



  return (
    <div
      id="forum-page"
      className="flex h-screen "
    >
      <SideBar />
      <div className="w- h-full ">
        <div className="flex flex-col  h-1/3 bg-[url('/landing-background.avif')] bg-no-repeat bg-cover overflow-x-hidden">
          <div className="grid  m-10 p-10 gap-2">
            <div className="flex h-2/3 justify-center items-center text-4xl font-bold font-mono text-white">
              Study Abroad Search
            </div>
            <div className="flex h-1/2 justify-center items-bottom text-4xl">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="grid bg-white w-[85vw] ">
              
            <div className="flex flex-row h-2 p-5 w-[85vw] text-2xl">
              Programs By Location:
            </div>

          {/* displayed locations  */}
            <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
              <ScrollingImagesRounded images={images} />
            </div>

          {/* programs popout  */}
           <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
              <ScrollingImagesSquare images={images} />
          </div>
        
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
