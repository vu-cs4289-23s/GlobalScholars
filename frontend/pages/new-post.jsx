import SideBar from "../components/all-pages/sidebar";
import CityPost from "../components/forum/city/city-post.jsx";
import React, {useState, useEffect} from "react";
import ProgramPost from "../components/forum/program/program-post.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../redux/user/user-slice.js";

export default function NewPost() {
    const [postType, setPostType] = useState("city");
    const [userId, setUserId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserSession);
    }, []);

    useEffect(() => {
        // console.log(userInfo);
        if (userInfo.username === undefined || userInfo.username === '') {
            navigate("/login");
        }
    }, [userInfo]);

    return (
        <div className="w-screen h-screen flex flex-row bg-blue-light">
            <SideBar />
            <div className="overflow-y-scroll h-full w-screen">
                <div id="type-selector" className="">
                    <div id="selector-container" className="">
                        <div className="flex w-auto bg-white sm:mx-20 text-left p-4 rounded-lg m-4 justify-around">
                            <div className="font-bold sm:text-[30px] text-[24px]">
                               Select the forum type you would like to post to:
                            </div>
                            <div className="flex justify-center align-middle items-center">
                                <select name="post-type" id="post-type" onChange={(e=>setPostType(e.target.value))} className="bg-white border-2 border-black rounded-lg m-2 p-2">
                                    <option value={"city"}>City</option>
                                    <option value={"program"}>Program</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {postType === "city" ? <CityPost username={userInfo.username}/> : <ProgramPost username={userInfo.username}/> }
            </div>
        </div>
    );
}