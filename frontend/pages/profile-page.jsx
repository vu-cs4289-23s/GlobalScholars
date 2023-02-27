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

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const { userInfo, loggedIn, success, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState({});

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

  const getData = () => {
    axios
      .get("/api/v1/generateDummyData?posts=10&users=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="forum-page" className="flex flex-row h-screen w-screen ">
      <SideBar />
      <div className="w-full">
        <div
          id="header"
          className="flex w-full h-[20%] justify-center text-4xl"
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
          <div className="flex w-full justify-between p-4">
            <p className="text-sm sm:text-2xl ">Reviews</p>
            <p className="text-sm sm:text-base">1370 total likes</p>
          </div>
        </div>
        {object.posts && object.posts.length > 0 ? (
          <div className=" overflow-scroll h-[60%] sm:h-[70%] ">
            {object.posts.map((post) => (
              <Reviews
                key={post.id}
                id={post.id}
                username={post.username}
                program={post.program}
                content={post.content}
                likes={post.likes}
                saves={post.saves}
                tags={post.tags}
                dislikes={post.dislikes}
                location={post.location}
                comments={post.comments}
                date={post.date}
              />
            ))}
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <ProfileModal modal={modalOpen} setModal={setModalOpen} />
      ) : null}
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
