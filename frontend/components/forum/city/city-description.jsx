import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";
import Reviews from "../../profile-page/reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getForumDataByName }  from "../redux/geo/geo-slice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getLocationByNameAsyncAction } from "../../../redux/geo/geo-slice.js";

const CityDescription = ({ city, country, description }) => {

  const dispatch = useDispatch();

  // Format data
  city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  const [object, setObject] = useState({});
  const { programInfo, locationInfo } = useSelector((state)  => state.geo);


  const getData = () => {
    axios
      .get("/api/v1/generateDummyData?posts=10&users=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
      //  console.log(res.data);
        setObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
    {name: "Vienna, Austria", src:"frontend/images/landing-locations/vienna.jpeg"},]


  const onForumLoad = (event, name) => {
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
    <div className="grid grid-cols-3 sm:grid-cols-1 bg-gray-400 bg-opacity-50 mx-20 text-left pt-2 pb-6 px-4 rounded-lg absolute">
      <grid-cols-1>
        <span className="text-[30px]">
          <span className="content-start row ">
            Travel To:
            <span className="font-bold"> {city}, {country}</span>
          </span>
        </span>
        <p>
          {description}
        </p>
        <p className="py-4 font-bold text-[24px]">Top Tags</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 justify-around justify-items-center">
          <Tag content={locationInfo.top_tags[0]} color={"bg-red-400"} />
          <Tag content={locationInfo.top_tags[1]} color={"bg-red-400"} />
          <Tag content={locationInfo.top_tags[2]} color={"bg-red-400"} />
          <Tag content={locationInfo.top_tags[3]} color={"bg-red-400"} />
          <Tag content={locationInfo.top_tags[4]} color={"bg-red-400"} />
        </div>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
          <Rating rating={locationInfo.star_rating} type={"Overall"} />
          {/*<Rating rating={3.7} type={"Safety"} />*/}
          {/*<Rating rating={4.4} type={"Affordability"} />*/}
          {/*<Rating rating={2.9} type={"Sightseeing"} />*/}
        </div>
        <p className="py-4 font-bold text-[24px]">
          Like what you see? Study Here!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">


          {/*<div className="snap-proximity snap-x overflow-x-auto w-[85vw] flex flex-row p-8">*/}
          {/*  {images.map(({ name, src }) => (*/}
          {/*    <div className="snap-center" key={name}>*/}
          {/*      <div className="scroll-snap-align-start h-64 w-64">*/}
          {/*        <img*/}
          {/*          src={src}*/}
          {/*          alt={name}*/}
          {/*          className="h-52 w-52 rounded-full object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline"*/}
          {/*          data-name={name}*/}
          {/*          onLoad={event => onForumLoad(event, name)}*/}
          {/*        />*/}
          {/*        <p className="text-base font-bold p-6 text-gray-900" data-name={name}>*/}
          {/*          {name}*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}


        </div>
        {object.posts && object.posts.length > 0 ? (
          <div className=" overflow-scroll h-[60%] sm:h-[70%] ">
            {object.posts.map((post) => (
              <Reviews
                key={post.id}
                id={post.id}
                username={post.username}
                program={post.program}
                content={post.content}
                likes={post.likes}
                saves={post.saves}
                tags={post.tags}
                dislikes={post.dislikes}
                location={post.location}
                comments={post.comments}
                date={post.date}
              />
            ))}
          </div>
        ) : null}
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
