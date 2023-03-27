import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";
import Reviews from "../../profile-page/reviews";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollingImages from "../../all-pages/scrolling-images.jsx";
import images from "../../../../images.js";
import {
  getPostsByLocationAsyncAction,
  getAllPostsAsyncAction,
} from "../../../redux/post/post-slice.js";
import { useDispatch, useSelector } from "react-redux";

const CityDescription = ({
  city,
  country,
  top_tags,
  overall_rating,
}) => {
  const [posts, setPosts] = useState({});
  const dispatch = useDispatch();
  const { postInfo } = useSelector((state) => state.post);

  useEffect(() => {
    if (city && city !== "City") {
      // Fetch posts by city name passed through
      dispatch(getPostsByLocationAsyncAction(city));
    } else {
      dispatch(getAllPostsAsyncAction());
    }
  }, [city]);

  useEffect(() => {
    setPosts(postInfo);
  }, [postInfo]);

  var programImages = [{name: "DIS Copenhagen",  src: "/forum-locations/DIS-Copenhagen.png", url: "https://disabroad.org/copenhagen/"}]


  // const onForumLoad = (event, name) => {
  //   console.log(event);
  //   console.log(name);
  //   // setShowPrograms(name);
  //   console.log(name.split(",")[0].toLowerCase())
  //   dispatch(getLocationByNameAsyncAction(name.split(",")[0].toLowerCase()))
  //
  //   const programs = locationInfo.programs;
  // }

  return (
    <div className="grid h-auto grid-cols-1 bg-light-gray sm:mx-20 mx-4 text-left pt-2 pb-6 px-4 rounded-[45px] ">
      <grid-cols-1>
        <span className="text-[30px]">
          <span className="content-start row px-[3%]">
            Travel To:
            <span className="font-bold">
              {" "}
              {city}, {country}
            </span>
          </span>
        </span>
        <div style={{display : "flex", flexDirection : "row"}} className="grid">
        <p className="py-4 px-[5%] font-bold text-[20px]">Average Rating</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 self-center">
          <Rating rating={overall_rating}/>
        </div>
        </div>
        <p className="py-4 px-[5%] font-bold text-[20px]">Top Tags</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 px-[5%] justify-around justify-items-center">
          {top_tags &&
            top_tags.map((tag, index) => (
              <Tag color={"bg-red-400"} content={tag} name={tag} key={index} />
            ))}
        </div>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
