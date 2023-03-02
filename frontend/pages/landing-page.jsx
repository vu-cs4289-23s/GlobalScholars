import SearchBar from "../components/landing-page/search-bar";
import SideBar from "../components/all-pages/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, getUserAsyncAction } from "../redux/user/user-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import { getLocationByNameAsyncAction } from "../redux/geo/geo-slice.js";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { loggedIn, userToken, loading, success, userInfo } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const logOutHandle = () => {
    dispatch(logoutAction());
  };
  useEffect(() => {
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  //get all landing pages into images
  var images = [
    {
      name: "Barcelona, Spain",
      src: "/landing-locations/barcelona.jpg",
    },
    {
      name: "Copenhagen, Denmark",
      src: "/landing-locations/copenhagen.jpeg",
    },
    {
      name: "Edinburgh, Scotland",
      src: "/landing-locations/edinburgh.jpeg",
    },
    { name: "Florence, Italy", src: "/landing-locations/florence.jpeg" },
    {
      name: "Glasgow, Scotland",
      src: "/landing-locations/glasgow.jpeg",
    },
    {
      name: "London, United Kingdom",
      src: "/landing-locations/london.jpeg",
    },
    { name: "Madrid, Spain", src: "/landing-locations/madrid.jpeg" },
    { name: "Paris, France", src: "/landing-locations/paris.jpeg" },
    { name: "Rome, Italy", src: "/landing-locations/rome.jpeg" },
    { name: "Seville, Spain", src: "/landing-locations/seville.jpeg" },
    {
      name: "Stockholm, Sweden",
      src: "/landing-locations/stockholm.jpeg",
    },
    {
      name: "Prague, Czech Republic",
      src: "/landing-locations/prague.jpeg",
    },
    {
      name: "Budapest, Hungary",
      src: "/landing-locations/budapest.jpeg",
    },
    { name: "Vienna, Austria", src: "/landing-locations/vienna.jpeg" },
  ];

  const { locationInfo } = useSelector((state) => state.geo);

  const onImageClick = (event, name) => {
    console.log(event);
    console.log(name);
    // setShowPrograms(name);
    console.log(name.split(",")[0].toLowerCase());
    dispatch(getLocationByNameAsyncAction(name.split(",")[0].toLowerCase()));

    const programs = locationInfo.programs;
  };

  //dynamic array to hold program images & names (will be populated on a click of a location)
  const [programImages, setProgramImages] = useState([]);

  //bool state that displays programs or hides them depending on location clicked
  const [showPrograms, setShowPrograms] = useState("");
  useEffect(() => {
    //fetch data here
  }, [showPrograms]);

  return (
    <div id="forum-page" className="flex h-screen ">
      <SideBar />
      <div className="overflow-y-scroll">
        <div className="flex flex-col h-1/2 bg-[url('/landing-background.avif')] bg-no-repeat bg-cover justify-end">
          <div className="grid  m-10 p-10 gap-2">
            <div className="flex h-2/3 justify-center text-4xl font-bold font-mono text-white mb-3">
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

          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            {images.map(({ name, src }) => (
              <div className="snap-center" key={name}>
                <div className="scroll-snap-align-start h-64 w-64">
                  <img
                    src={src}
                    alt={name}
                    className="h-52 w-52 rounded-full object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline"
                    data-name={name}
                    onClick={(event) => onImageClick(event, name)}
                  />
                  <p
                    className="text-base font-bold p-6 text-gray-900"
                    data-name={name}
                  >
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* programs popout  */}
          <div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">
            {images.map(({ name, src }) => (
              <div className="snap-center" key={name}>
                <div className="scroll-snap-align-start h-64 w-64">
                  <img
                    src={src}
                    alt={name}
                    className="h-52 w-52 object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline"
                    data-name={name}
                  />
                  <p
                    className="text-base font-bold p-6 text-gray-900"
                    data-name={name}
                  >
                    {name}
                  </p>
                </div>
              </div>
            ))}
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
