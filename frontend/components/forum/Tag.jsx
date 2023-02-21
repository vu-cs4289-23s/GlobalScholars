import { useLocation, useParams, useNavigate } from "react-router-dom";

const Tag = () => {
  const navigate = useNavigate();
  return (
    <span className="w-153 h-45 px-2 rounded-full bg-yellow-600 bg-opacity-100"> here is the tag</span>
  );
};

export default Tag;