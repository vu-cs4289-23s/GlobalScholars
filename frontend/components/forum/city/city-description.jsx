import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";

const CityDescription = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 bg-gray-400 bg-opacity-50 mx-20 text-left pt-2 pb-6 px-4 rounded-lg">
      <grid-cols-1>
        <span className="text-[30px]">
          <span className="content-start row ">
            Travel To:
            <span className="font-bold"> Copenhagen, Denmark</span>
          </span>
        </span>
        <p>
          Copenhagen is the capital and largest city of Denmark, known for its
          beautiful architecture, rich history, and vibrant cultural scene, as
          well as being a hub for innovation and sustainability. The city is
          also famous for attractions such as Tivoli Gardens, The Little Mermaid
          statue, and the historic district of Nyhavn.
        </p>
        <p className="py-4 font-bold text-[24px]">Top Tags</p>
        <span className="grid grid-cols-3 sm:grid-cols-5 justify-around justify-items-center">
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </span>
        <p className="py-4 font-bold text-[24px]">Ratings</p>
        <span className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center">
          <Rating />
          <Rating />
          <Rating />
          <Rating />
        </span>
        <p className="py-4 font-bold text-[24px]">
          Like what you see? Study Here!
        </p>
        <span className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
          <ProgramLink />
          <ProgramLink />
          <ProgramLink />
        </span>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
