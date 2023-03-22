import Header from "../components/login&register/header";
import SideBar from "../components/all-pages/sidebar";

import { useParams, useNavigate } from "react-router-dom";
import ProfileBio from "../components/profile-page/profile-bio";
import { useState, useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../components/profile-page/profile-modal";
import Reviews from "../components/profile-page/reviews";
import axios from "axios";
import { getPostsByUserAsyncAction } from "../redux/post/post-slice.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const { userInfo, loggedIn, success, loading } = useSelector(
    (state) => state.user
  );
  const { postInfo } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction());
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState({});
  // for setting post state
  let [toggle, setToggle] = useState(false);
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
  console.log(object);

  // // grab userInfo
  // useEffect(() => {
  //   if (userInfo && userInfo.username) {
  //     dispatch(getPostsByUserAsyncAction(userInfo.username));
  //   }
  // }, [userInfo]);
  //
  // // update postInfo
  // if

  const getData = () => {
    axios
      .get("/api/v1/generateDummyData?posts=10&users=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        //  console.log(res.data);
        setObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const populatePosts = (ev) => {
    if (ev.target.name === "posts") {
      setToggle(true);
    }
    if (ev.target.name === "saves") {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (toggle === true) {

    } else {

    }
  }, [toggle])

  return (
    <div id="forum-page" className="flex flex-row h-screen w-screen ">
      <SideBar />
      <div className="w-full bg-slate-400">
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
            <div>
              <button className="text-sm sm:text-2xl " onClick={populatePosts} name="posts">Posts</button>
              <button className="text-sm sm:text-2xl " onClick={populatePosts} name="saves">Saves</button>
            </div>
            <p className="text-sm sm:text-base">{posts & posts.length > 0 ? "count total likes" : ""}</p>
          </div>
        </div>
        {object.posts && object.posts.length > 0 ? (
          <div className=" overflow-scroll h-[60%] sm:h-[65%] md:h-[70%] ">
            {object.posts.map((post, key) => (
              <div key={key}>
                <Reviews
                  key={key}
                  id={post.id}
                  username={post.username}
                  program={"Computer Science"}
                  content={post.content}
                  likes={post.likes}
                  saves={post.saves}
                  tags={post.tags}
                  dislikes={post.dislikes}
                  location={post.location}
                  comments={post.comments}
                  date={"2021-05-05"}
                  type={"review"}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <ProfileModal modal={modalOpen} setModal={setModalOpen} />
      ) : null}
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
      </div>
    </div>

    /*<div id="parent" className="bg-[rgba(39,74,104,0.5)] w-screen h-screen">
      {!loading ? (
        <ProfileBio
          username={user.username}
          email={user.primary_email}
          first_name={user.first_name}
          last_name={user.last_name}
          city={user.city}
        />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl text-slate-600">Loading...</h1>
        </div>
      )}
    </div>*/
    
  );
}
