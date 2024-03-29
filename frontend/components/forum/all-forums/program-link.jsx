import { useLocation, useParams, useNavigate } from "react-router-dom";

const ProgramLink = () => {
  const navigate = useNavigate();
  return (
    <a href="https://disabroad.org/copenhagen/">
      <img
        className="rounded-full scale-[70%] "
        src="/DIS-Copenhagen.png"
      />
      <div className="text-lg align-text-top text-black">program name</div>
    </a>
  );
};

export default ProgramLink;
