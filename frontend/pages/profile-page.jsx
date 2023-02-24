import Header from "../components/login&register/header";
import SideBar from "../components/all-pages/sidebar";

import { useParams, useNavigate } from "react-router-dom";
import ProfileBio from "../components/profile-page/profile-bio";
import { useState, useEffect } from "react";
import { getUserAsyncAction, logoutAction } from "../redux/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../components/profile-page/profile-modal";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { userInfo, loggedIn, success, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const logOutHandle = () => {
    dispatch(logoutAction({}));
  };
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (userInfo.majors === undefined) {
      //open modal
      setModalOpen(true);
    }
  }, [userInfo]);

  return (
    <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
      <SideBar />
      <div className="w-screen">
        <div id="header" className="flex h-1/4 justify-center text-4xl">
          {!loading ? (
            <ProfileBio {...userInfo} />
          ) : (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-4xl text-slate-600">Loading...</h1>
            </div>
          )}
        </div>
        <div
          id="contents"
          className="flex h-3/4 justify-center text-4xl bg-white"
        ></div>
      </div>
      <div className="absolute right-1 top-2">
        <button onClick={() => logOutHandle()}>Log Out</button>
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
