import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";
import Reviews from "../../profile-page/reviews";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getPostsByLocationAsyncAction,
  getAllPostsAsyncAction,
} from "../../../redux/post/post-slice.js";
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
  like_cnt,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="grid h-auto grid-cols-1 bg-gray-400 bg-opacity-50 sm:mx-20 mx-4 text-left pt-2 pb-6 px-4 rounded-lg">
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
            top_tags.map((tag, index) => (
              <Tag color={"red-400"} content={tag} name={tag} key={index} />
            ))}
        </div>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
          <Rating rating={overall_rating} type={"Overall"} />
          <Rating rating={safety_rating} type={"Safety"} />
          <Rating rating={affordability_rating} type={"Affordability"} />
          <Rating rating={sightseeing_rating} type={"Sightseeing"} />
        </div>
        <p className="py-4 font-bold text-[24px]">
          Like what you see? Study Here!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
        </div>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
