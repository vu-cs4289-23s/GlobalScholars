import SideBar from "../components/all-pages/sidebar";
import SearchBar from "../components/landing-page/search-bar";
import CityDescription from "../components/forum/city/city-description.jsx";
import FilterBar from "../components/forum/all-forums/filter-bar.jsx";
import CityPost from "../components/forum/city/city-post.jsx";
import ForumPost from "../components/all-pages/post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAsyncAction,  logoutAction } from "../redux/user/user-slice";
import { getForumDataByName, } from "../redux/geo/geo-slice.js";
import { getAllPostsAsyncAction, getPostsByLocationAsyncAction } from "../redux/post/post-slice.js";
import Reviews from "../components/profile-page/reviews.jsx";
import Comment from "../components/all-pages/comment.jsx";

export default function CityForumPage() {
  const { userInfo, loggedIn, success } = useSelector((state) => state.user);
  const { locationInfo } = useSelector((state) => state.geo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();
  let [posts, setPosts] = useState([]);
  let { postInfo } = useSelector((state) => state.post);
  const [location, setLocation] = useState({
    city: "City",
    country: "Country",
    description: "This is my city description",
    programs: [],
    top_tags: ["Tag One", "Tag Two", "Tag Three", "Tag Four", "Tag Five"],
    overall_rating: 0,
    // safety_rating: 0,
    // affordability_rating: 0,
    // sightseeing_rating: 0,
    image_link: "", // TODO -- add location image links to DB
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

  // Get forum data by name in url
  useEffect(() => {
    if (name !== undefined) {
      dispatch(getForumDataByName(name));
    }
  }, [name]);

  // Set Location data
  useEffect(() => {
    if (locationInfo && locationInfo.city !== "") {
      setLocation({
        city: locationInfo.city,
        country: locationInfo.country,
        description: locationInfo.description,
        top_tags: locationInfo.top_tags,
        overall_rating: locationInfo.overall_rating,
        image_link: locationInfo.image_link,
        like_cnt: locationInfo.like_cnt,
      });
    }
  }, [locationInfo]);

  // fetch all posts for location or fetch all posts
  useEffect(() => {
    if (location.city && location.city !== "City") {
      // Fetch posts by city name passed through
      dispatch(getPostsByLocationAsyncAction(location.city));
    } else {
      dispatch(getAllPostsAsyncAction());
    }
  }, [location]);

  // set posts react state with postInfo from redux state
  useEffect(() => {
    setPosts(postInfo);
  }, [postInfo]);

  return (
    <div id="forum-page" className="flex h-screen w-screen overflow-y-scroll">
      <SideBar />
      <div>
        <img
          className="flex h-[30%] w-screen object-center object-cover"
          src="/landing-locations/copenhagen.jpeg"
        />
        <div className="absolute top-40 z-1 w-[85%] overflow-scroll h-[60%] sm:h-[77%]">
          {name ?
            <CityDescription
              description={location.description}
              city={location.city}
              country={location.country}
              top_tags={location.top_tags}
              overall_rating={location.overall_rating}
            />
          :
            <SearchBar forum={true}/>}
          <FilterBar />
        {/*put toggle above description?*/}
        {posts && posts.length > 0 ? (
          <div>
              {posts.map((post, index) => (
                  <ForumPost
                      key={index}
                      id={post._id}
                      avatar={post.owner ? post.owner.avatar_url : "" }
                      username={post.owner ? post.owner.username : "" }
                      content={post.content}
                      likes={post.likes}
                      saves={post.saves}
                      tags={post.tags}
                      dislikes={post.dislikes}
                      comments={post.comments}
                      program={post.program}
                      location={post.location}
                      date={post.timestamp}
                  />
              ))}
              </div>
        ) : null}
        </div>
      </div>
        <div className="absolute flex-row right-2 top-2">
          <button onClick={() => logOutHandle()}>Log Out</button>
        </div>
          <div className="absolute  w-1/4 flex-row right-2 top-14">
            { name ? <SearchBar /> : null}
          </div>
      </div>
  );
}
