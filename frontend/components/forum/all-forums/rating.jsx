import { useLocation, useParams, useNavigate } from "react-router-dom";

const Rating = () => {
  const navigate = useNavigate();
  return (
    <span className="w-120 h-120 p-10 font-bold text-lg bg-yellow-200 bg-opacity-100">Rating</span>
  );
};

export default Rating;