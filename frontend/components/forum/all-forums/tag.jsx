import { useLocation, useParams, useNavigate } from "react-router-dom";

const Tag = ({ content }) => {
  //const navigate = useNavigate();
  return (
    <div className="flex rounded-full bg-yellow-600 bg-opacity-100 justify-center my-1">
      <div className="mx-2 my-1">{content}</div>
    </div>
  );
};

export default Tag;