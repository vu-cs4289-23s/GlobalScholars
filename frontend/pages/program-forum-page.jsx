import SideBar from "../components/all-pages/sidebar";
import FilterBar from "../components/forum/all-forums/filter-bar.jsx";
import ForumPost from "../components/all-pages/post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { getAllPostsAsyncAction, getPostsByProgramAsyncAction } from "../redux/post/post-slice.js";
import ProgramDescription from "../components/forum/program/program-description.jsx";
import { getForumDataByName } from "../redux/geo/geo-slice.js";
import SearchBar from "../components/landing-page/search-bar.jsx";

export default function ProgramForumPage() {
  let { userInfo, loggedIn, success } = useSelector((state) => state.user);
  let { programInfo } = useSelector((state) => state.geo);
  let { postInfo } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  let [program, setProgram] = useState({
    program_name: "Program Name",
    description: "",
    terms: [],
    top_tags: [],
    overall_rating: 0,
    image_link: "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/234/2017/12/11205619/brochure_1170.jpg",
    like_cnt: 0,
  });
  let [posts, setPosts] = useState([]);


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

  // Get forum data by name in url
  useEffect(() => {
    if (name !== undefined) {
      dispatch(getForumDataByName(name));
    }
  }, [name]);

  useEffect(() => {
    // Set Program data
    if (programInfo && programInfo.program_name !== "") {
      setProgram({
        program_name: programInfo.program_name,
        terms: programInfo.terms,
        description: programInfo.description,
        location: programInfo.location,
        top_tags: programInfo.top_tags,
        overall_rating: programInfo.overall_rating,
        image_link: programInfo.image_link,
        like_cnt: programInfo.like_cnt,
      });
    }
  }, [programInfo]);

  useEffect(() => {
    if (program.program_name && program.program_name !== "Program Name") {
      // Fetch posts by city name passed through
      dispatch(getPostsByProgramAsyncAction(program.program_name));
    } else {
      dispatch(getAllPostsAsyncAction());
    }
  }, [program]);

  // set posts react state with postInfo from redux state
  useEffect(() => {
    setPosts(postInfo);
  }, [postInfo]);

  return (
    <div id="forum-page" className="flex h-screen w-screen bg-blue-rgba">
      <SideBar />
      <div className="bg-blue-light overflow-y-scroll">
        <img
          className="flex h-1/4 w-screen object-center object-cover"
          src={program.image_link}
        />
        <div className="absolute top-40 z-1 w-[85%] overflow-scroll h-[60%] sm:h-[77%]">
        { name ?
          <ProgramDescription
          program={program.program_name}
          terms={program.terms}
          top_tags={program.top_tags}
          overall_rating={program.overall_rating}
        /> :
          <SearchBar forum={true}/>}
        <FilterBar />
        {posts && posts.length > 0 ? (
          <div>
            {posts.map((post, index) => (
              <ForumPost
                key={index}
                id={post._id}
                avatar={post.owner ? post.owner.avatar_url : "" }
                username={post.owner ? post.owner.username : "" }
                title={post.title}
                content={post.content}
                likes={post.likes}
                saves={post.saves}
                tags={post.tags}
                dislikes={post.dislikes}
                comments={post.comments}
                program={post.program}
                location={post.location}
                date={post.timestamp}
                url={name ? `/city/${name}` : "/city"}
              />
            ))}
          </div>
        ) : null}
        </div>
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
      <div className="absolute  w-1/4 flex-row right-2 top-14">
        { name ? <SearchBar /> : null}
      </div>
    </div>
  );
}
