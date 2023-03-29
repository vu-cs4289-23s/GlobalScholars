import SideBar from "../components/all-pages/sidebar";
import { useParams, useNavigate } from "react-router-dom";
import ProfileBio from "../components/profile-page/profile-bio";
import { useState, useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../components/profile-page/profile-modal";
import Reviews from "../components/profile-page/reviews";
import { getPostByIdAsyncAction, getPostsByUserAsyncAction } from "../redux/post/post-slice.js";
import TabbedFolder from "../components/price-estimator/trip-folder";

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
    <div id="forum-page" className="flex overflow-y-hidden overscroll-y-none h-screen w-screen ">
      <SideBar />
      <div className="w-screen h-screen bg-slate-400">
        <div
          id="header"
          className="flex w-full h-[30%] justify-center text-4xl "
        >
          {!loading ? (
            <ProfileBio />
          ) : (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-4xl text-slate-600">Loading...</h1>
            </div>
          )}
        </div>
        <div
          id="contents"
          className="flex flex-col  justify-center text-4xl bg-white"
        >
          <div className="flex w-full justify-between p-4 bg-slate-400">
            {/* <div>
              <button className="text-sm sm:text-2xl " onClick={populatePosts} name="posts">Posts</button>
              <button className="text-sm sm:text-2xl " onClick={populatePosts} name="saves">Saves</button>
            </div> */}
            <p className="text-sm sm:text-base">{posts & posts.length > 0 ? "count total likes" : ""}</p>
          </div>
        </div>
        {posts && posts.length > 0 ? (
<<<<<<< HEAD
            <div className=" overflow-scroll h-[60%] sm:h-[70%] ">
              <TabbedFolder tabs={tabs} card={
              <div>
              {posts.map((post, index) => (
                  <Reviews
                  key={index}
                  id={post._id}
                  username={post.owner ? post.owner.username : "" }
                  program={post.program}
                  content={post.content}
                  likes={post.likes}
                  saves={post.saves}
                  tags={post.tags}
                  dislikes={post.dislikes}
                  location={post.location}
                  comments={post.comments}
                  date={post.timestamp}/>  
              ))}
              </div>
            } />
            </div>
=======
          <div className=" overflow-y-scroll h-[60%] sm:h-[65%] md:h-[70%] bg-slate-400">
            {posts.map((post, index) => (
              <Reviews
                key={index}
                id={post._id}
                username={post.owner ? post.owner.username : ""}
                program={post.program}
                content={post.content}
                likes={post.likes}
                saves={post.saves}
                tags={post.tags}
                dislikes={post.dislikes}
                location={post.location}
                comments={post.comments}
                date={post.timestamp}
              />
            ))}
          </div>
>>>>>>> 3aaabaa465b49e872f15dcdcd322bed73853226d
        ) : null}
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
