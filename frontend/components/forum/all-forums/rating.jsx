import { useLocation, useParams, useNavigate } from "react-router-dom";

const Rating = ({ rating, type }) => {
  const navigate = useNavigate();
  return (
      <div>
        <div className="flex font-extrabold text-lg bg-yellow-200 bg-opacity-100 text-center justify-center align-middle h-32 w-52">
          <div className="m-auto text-[32px]">
              {rating}
          </div>
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