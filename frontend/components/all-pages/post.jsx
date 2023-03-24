import { RiFireFill, RiFilter2Fill } from "react-icons/ri";
import {FaCrown, FaFilter, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import React from "react";
import {BsBookmark, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill, BsHandThumbsDownFill} from "react-icons/bs";

const ForumPost = ({ key, id, user, program, title, content, likes, saves, tags, dislikes, location, comments, date}) => {

    // TODO: get the username and profile photo from the user ID passed into method
    // TODO: add logic to decifer if this is a city post or a program post
    // TODO: (when data model changes) get number of likes and dislikes from the likes and dislikes array
    // TODO: add logic for showing the tags
    // TODO: convert date into something more human readable

    return (
        <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between flex-col">
            <div className="flex mb-2 justify-between">
                <div className="flex items-center">
                    <img
                        src="https://www.nationsonline.org/gallery/France/View-of-Versailles.jpg"
                        alt="avatar"
                        className={`flex w-10 h-10 rounded-full object-cover shadow-none shadow-black `}
                    />
                    <div className="font-bold ml-2">{user}</div>
                    <div className="ml-2">in</div>
                    <div className="font-bold ml-2">{location}</div>
                </div>
                <div className="flex items-center">
                    {date}
                </div>
            </div>
            <div className="flex flex-col bg-gray-200 rounded top-2">
                <div className="font-bold m-2">{title}</div>
                <div className="mx-2">{content}</div>
                <div className="m-2">post tags</div>
            </div>
            <div className="flex justify-between">
                <div>
                    <form className="">
                        <input
                            type="text"
                            placeholder="Leave a comment"
                            className="border-opacity-0 shadow-none w-full"
                        />
                    </form>
                </div>
                <div className="flex justify-center align-middle items-center">
                    <BsHandThumbsUp
                        height={80}
                        width={80}
                        className="h-6 w-6 m-2"
                    />
                    <div id="num-likes">
                        100
                    </div>
                    <BsHandThumbsDown
                        height={80}
                        width={80}
                        className="h-6 w-6 m-2"
                    />
                    <div id="num-dislikes">
                        50
                    </div>
                    <BsBookmark
                        height={80}
                        width={80}
                        className="h-6 w-6 m-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ForumPost;
