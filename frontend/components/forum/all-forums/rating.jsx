import { useLocation, useParams, useNavigate } from "react-router-dom";
import { GiRank1 } from "react-icons/gi"

const Rating = ({ rating, type }) => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative" }}>
      <GiRank1 className="h-32 w-52"/>
      <div className="m-auto absolute text-[32px]" style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {1}
      </div>
      <div className="flex justify-center align-middle">
        <div className="m-1">
          {type}
        </div>
      </div>
    </div>
  );
};


export default Rating;