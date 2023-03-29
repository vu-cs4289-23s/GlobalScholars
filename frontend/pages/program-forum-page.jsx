import SideBar from "../components/all-pages/sidebar";
import FilterBar from "../components/forum/all-forums/filter-bar.jsx";
import ForumPost from "../components/all-pages/post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import {
  getForumDataByName,
  getAllLocationsAsyncAction,
  getAllProgramsAsyncAction,
} from "../redux/geo/geo-slice.js";
import axios from "axios";
import {getAllPostsAsyncAction, getPostsByLocationAsyncAction} from "../redux/post/post-slice.js";
import Reviews from "../components/profile-page/reviews.jsx";
import ProgramDescription from "../components/forum/program/program-description.jsx";

export default function ProgramForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { programInfo } = useSelector((state) => state.geo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();

  // TODO -- make forum dynamic for programs
  const [program, setProgram] = useState({
    program_name: "CIEE Santiago, Dominican Republic: Summer Public Health",
    description: "This is my program description",
    majors: ["Medicine, Health, and Society", "Neuroscience", "Biochemistry", "Biology", "Spanish"],
    semesters: ["Summer"],
    top_tags: ["Tag One", "Tag Two", "Tag Three", "Tag Four", "Tag Five"],
    overall_rating: 0,
    safety_rating: 0,
    affordability_rating: 0,
    sightseeing_rating: 0,
    image_link: "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/234/2017/12/11205619/brochure_1170.jpg",
    like_cnt: 0,
  });

  const logOutHandle = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (success && !loggedIn) {
      navigate("/login");
    }
    if (loggedIn === false && userInfo.username !== "") {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [loggedIn, userInfo]);

  useEffect(() => {
    if (name !== undefined) {
      dispatch(getForumDataByName(name));
    } else {
      dispatch(getAllProgramsAsyncAction());
    }
  }, [name]);


  // useEffect(() => {
  //   // Set Program data
  //   if (programInfo && programInfo.program_name !== "") {
  //     setProgram({
  //       program_name: programInfo.program_name,
  //       description: programInfo.description,
  //       location: programInfo.location,
  //       top_tags: programInfo.top_tags,
  //       overall_rating: programInfo.overall_rating,
  //       safety_rating: programInfo.safety_rating,
  //       affordability_rating: programInfo.affordability_rating,
  //       sightseeing_rating: programInfo.sightseeing_rating,
  //       image_link: programInfo.image_link,
  //       like_cnt: programInfo.like_cnt,
  //     });
  //   }
  // }, [programInfo]);

  return (
    <div id="forum-page" className="flex h-screen w-screen bg-blue-rgba">
      <SideBar />
      <div className="bg-blue-light overflow-y-scroll">
        <img
          className="flex h-1/4 w-screen object-center object-cover"
          src={program.image_link}
        />
        <ProgramDescription
            program={program.program_name}
            majors={program.majors}
            semesters={program.semesters}
            top_tags={program.top_tags}
            overall_rating={program.overall_rating}
            safety_rating={program.safety_rating}
            affordability_rating={program.affordability_rating}
            sightseeing_rating={program.sightseeing_rating}
        />
        <FilterBar />
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
