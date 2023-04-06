import Rating from "../all-forums/rating.jsx";
import { useDispatch, useSelector } from "react-redux";

const CityDescription = ({
  city,
  country,
  top_tags,
  overall_rating,
}) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
        </div>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
