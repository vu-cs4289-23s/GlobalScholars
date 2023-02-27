import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";
import Reviews from "../../profile-page/reviews";
import { useEffect, useState } from "react";
import axios from "axios";

const CityDescription = ({ city, country, description }) => {
  // Format data
  city = city.charAt(0).toUpperCase() + city.slice(1);
  country = country.charAt(0).toUpperCase() + country.slice(1);
  const [object, setObject] = useState({});

  const getData = () => {
    axios
      .get("/api/v1/generateDummyData?posts=10&users=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
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
          <Tag content={"Weekend trip"} />
          <Tag content={"Very affordable"} />
          <Tag content={"Walkable"} />
          <Tag content={"Awesome nightlife"} />
          <Tag content={"Amazing eats"} />
        </div>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
          <Rating rating={4.2} type={"Overall"} />
          <Rating rating={3.7} type={"Safety"} />
          <Rating rating={4.4} type={"Affordability"} />
          <Rating rating={2.9} type={"Sightseeing"} />
        </div>
        <p className="py-4 font-bold text-[24px]">
          Like what you see? Study Here!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
          <ProgramLink />
          <ProgramLink />
          <ProgramLink />
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
