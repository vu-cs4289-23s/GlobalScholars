import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";
import Reviews from "../../profile-page/reviews";
import { useEffect, useState } from "react";
import axios from "axios";
import { getLocationByNameAsyncAction } from "../../../redux/geo/geo-slice.js";
import ScrollingImages from "../../all-pages/scrolling-images.jsx";
import images from "../../../../images.js";
import { getPostsByLocationAsyncAction, getAllPostsAsyncAction } from "../../../redux/post/post-slice.js";
import { useDispatch, useSelector } from "react-redux";

const CityDescription = ({
  city,
  country,
  description,
  top_tags,
  overall_rating,
  safety_rating,
  affordability_rating,
  sightseeing_rating,
  image_link,
  like_cnt
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
    <div className="grid grid-cols-3 sm:grid-cols-1 bg-gray-400 bg-opacity-50 mx-20 text-left pt-2 pb-6 px-4 rounded-lg absolute">
      <grid-cols-1>
        <span className="text-[30px]">
          <span className="content-start row ">
            Travel To:
            <span className="font-bold">
              {" "}
              {city}, {country}
            </span>
          </span>
        </span>
        <p>{description}</p>
        <p className="py-4 font-bold text-[24px]">Top Tags</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 justify-around justify-items-center">
          {top_tags &&

            top_tags.map((tag, index) => <Tag color={"bg-red-400"} content={tag} key={index} />)}
        </div>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
          <Rating rating={overall_rating} type={"Overall"}  />
          <Rating rating={safety_rating} type={"Safety"} />
          <Rating rating={affordability_rating} type={"Affordability"} />
          <Rating rating={sightseeing_rating} type={"Sightseeing"} />
        </div>
        <p className="py-4 font-bold text-[24px]">
          Like what you see? Study Here!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
            {/* displayed locations  */}
            <div className="snap-proximity snap-x overflow-x-auto flex flex-row p-8">
              <ScrollingImages rounded={true} url={programImages.url} forum={true} images={programImages} />
          </div>
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
        {posts && posts.length > 0 ? (
          <div className=" overflow-scroll h-[60%] sm:h-[70%] ">
            {posts.map((post, index) => (
              <Reviews

                key={index}
                id={post._id}
                username={post.owner}
                program={post.program}
                content={post.content}
                likes={post.likes}
                saves={post.saves}
                tags={post.tags}
                dislikes={post.dislikes}
                location={post.location}
                comments={post.comments}
                date={post.timestamp}
              />
            ))}
          </div>
        ) : null}
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
