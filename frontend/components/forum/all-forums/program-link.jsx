import { useLocation, useParams, useNavigate } from "react-router-dom";

const ProgramLink = () => {
  const navigate = useNavigate();
  return (
    <img className="rounded-full scale-50 " src="frontend/assets/DIS-Copenhagen-Link.png" />
  );
};

export default ProgramLink;