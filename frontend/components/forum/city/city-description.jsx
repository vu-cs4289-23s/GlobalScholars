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

const CityDescription = ({ city,
                           country,
                           description,
                           top_tags,
                           overall_rating,
                           safety_rating,
                           affordability_rating,
                           sightseeing_rating }) => {

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
          <Tag content={top_tags[0]}/>
          <Tag content={top_tags[1]} />
          <Tag content={top_tags[2]} />
          <Tag content={top_tags[3]} />
          <Tag content={top_tags[4]} />
        </div>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
          <Rating rating={overall_rating} type={"Overall"}/>
          <Rating rating={safety_rating} type={"Safety"}/>
          <Rating rating={affordability_rating} type={"Affordability"} />
          <Rating rating={sightseeing_rating} type={"Sightseeing"} />
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
