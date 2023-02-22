import { useLocation, useParams, useNavigate } from "react-router-dom";

const Tag = () => {
  const navigate = useNavigate();
  return (
    <span className="w-[60%] px-3 py-1 rounded-full bg-yellow-600 bg-opacity-100 text-center">here is the tag</span>
  );
};

export default Tag;