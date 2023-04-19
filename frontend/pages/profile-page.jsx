import SideBar from "../components/all-pages/sidebar";
import { useParams, useNavigate } from "react-router-dom";
import ProfileBio from "../components/profile-page/profile-bio";
import React, { useState, useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../components/profile-page/profile-modal";
import { getPostByIdAsyncAction, getPostsByUserAsyncAction } from "../redux/post/post-slice.js";
import TabbedFolder from "../components/price-estimator/trip-folder";
import ForumPost from "../components/all-pages/post.jsx";
import {BsList, BsFillBookmarkFill} from "react-icons/bs";

const tabs = [
  { title: 'My Posts' },
  { title: 'Saved Posts' },
];


export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  let { userInfo, loggedIn, success, loading } = useSelector((state) => state.user);
  let { postInfo } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction());
  };
  const [modalOpen, setModalOpen] = useState(false);
  let [posts, setPosts] = useState([]);
  let [myPosts, setMyPosts] = useState(true);

  useEffect(() => {
    if (success && !loggedIn) {
      navigate("/login");
    }
  }, [success, loggedIn]);

  useEffect(() => {
    if (!loading && userInfo.majors.length === 0) {
      //open modal
      setModalOpen(true);
    }
  }, [userInfo, success, loading]);

  // Grab user and posts owned by the user at page render
  useEffect(() => {
    dispatch(getUserAsyncAction(username));
    dispatch(getPostsByUserAsyncAction(username));
  }, []);

  const populatePosts = (ev) => {
    // TODO
  };

  // Populate posts react state using postInfo redux state
  useEffect(() => {
    setPosts(postInfo);
  }, [postInfo]);

  return (
    <div id="profile-page" className="flex overflow-x-hidden h-screen w-screen bg-blue-light">
      <SideBar />
      <div className="w-full h-screen -mx-2 flex justify-center">
        <img
            className="flex h-[30%] w-screen sm:w-full object-center object-cover"
            src="/landing-background.avif"
        />
        <div className="absolute top-40 z-1 w-[75%] overflow-scroll h-[80%] sm:h-[78%]">
          <ProfileBio />
          <div className="flex justify-center rounded-lg bg-white mx-4 p-2 px-4 my-4 sm:flex-row sm:mx-20">
              <div id="my_posts" className="flex border-black rounded-lg border-2 p-2 m-auto hover:bg-gray-200" onClick={() => setMyPosts(true)}>
                <BsList size={24} className="my-auto" />
                <div className="font-bold text-[18px]">My Posts</div>
              </div>
              <div id="saved_posts" className="flex border-black rounded-lg border-2 p-2 m-auto hover:bg-gray-200" onClick={() => setMyPosts(false)}>
                <BsFillBookmarkFill size={24} className="my-auto" />
                <div className="font-bold text-[18px]">Saved Posts</div>
              </div>

          </div>
          <div>
            {myPosts ? "My posts" : "Saved Posts"}
          </div>
          {posts && posts.length > 0 ? (
              <div>
                {posts.map((post, index) => (
                    <ForumPost
                        key={index}
                        id={post._id}
                        username={post.owner ? post.owner.username : "" }
                        program={post.program}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        saves={post.saves}
                        tags={post.tags}
                        dislikes={post.dislikes}
                        location={post.location}
                        comments={post.comments}
                        date={post.timestamp}
                        url={""}
                    />
                ))}
              </div>
          ) : null}
        </div>
      </div>

      {modalOpen ? (
        <ProfileModal modal={modalOpen} setModal={setModalOpen} />
      ) : null}
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>
  );
}
