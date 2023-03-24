// import { useLocation, useParams, useNavigate } from "react-router-dom";
import React from "react";

const ProgramLink = () => {
  // const navigate = useNavigate();
  return (
    <a href="https://disabroad.org/copenhagen/">
      <img
        className="rounded-full scale-[70%] "
        src="DIS-Copenhagen-Link.png"
      />
      <div className="text-lg align-text-top text-black">program name</div>
    </a>
  );
};

export default ProgramLink;
