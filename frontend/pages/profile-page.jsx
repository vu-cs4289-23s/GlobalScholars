import Header from "../components/login&register/header";
import SideBar from "../components/all-pages/sidebar";

import { useParams, useNavigate } from "react-router-dom";
import ProfileBio from "../components/profile-page/profile-bio";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/user/${username}`, {
        withCredentials: true,
      });
      setUser(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(user);
  }, []);
  console.log("USER:", user.username);

  return (
    <div>
      {!loading ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div id="forum-page" className="flex h-screen w-screen grid-cols-2">
          <div className="w-[15%] ">
            <SideBar username={user.username} />
          </div>
          <div className="w-[85%]">
            <div className="flex h-1/4 justify-center text-4xl bg-blue-400">
              {" "}
              Profile Header{" "}
            </div>

            <div className="flex h-3/4 justify-center text-4xl bg-white">
              {" "}
              Profile Contents{" "}
            </div>
          </div>
        </div>
      )}
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
