import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../tag.jsx";
import Rating from "../rating.jsx";

const CityDescription = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-gray-400 bg-opacity-50 mx-20 text-left pt-2 pb-6 px-4">
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
        <p className="py-2 font-bold text-[24px]">Top Tags</p>
        <span className="flex justify-around">
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </span>
        <p className="pt-2 pb-4 font-bold text-[24px]">Ratings</p>
        <span className="flex justify-around">
          <Rating/>
          <Rating/>
          <Rating/>
          <Rating/>
        </span>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
