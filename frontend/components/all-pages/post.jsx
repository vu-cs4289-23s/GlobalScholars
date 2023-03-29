import React from "react";
import { useEffect, useState } from "react";
import {BsBookmark, BsFillBookmarkFill,
    BsHandThumbsUp, BsHandThumbsUpFill,
    BsHandThumbsDown, BsHandThumbsDownFill} from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Tag from "../forum/all-forums/tag.jsx";
import { useDispatch, useSelector } from "react-redux";
import { submitNewComment, resetComment } from "../../redux/comment/comment-slice.js";
import { useNavigate } from "react-router-dom";

const ForumPost = ({ key, id, user, program, title, content, likes, saves, tags, dislikes, location, comments, date}) => {

    // TODO: get the username and profile photo from the user ID passed into method -- need new endpoint
    const [username, setUsername] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // TODO: add logic to decifer if this is a city post or a program post -- need two new endpoints


    // time of post
    const [dateObj, setDateObj] = useState(null);

    useEffect(() => {
        setDateObj(new Date(date));
    }, [date]);

    // likes
    const [numLikes, setNumLikes] = useState(100);
    useEffect(() => {
        // setNumLikes(likes.length);
        setNumLikes(0);
    }, [likes]);

    // dislikes
    const [numDislikes, setNumDislikes] = useState(100);
    useEffect(() => {
        // setNumDislikes(likes.length);
        setNumDislikes(0);
    }, [dislikes]);

    // TODO: check if the current user has liked, disliked, or saved the post, if so, change the icon

    //comments
    let [comment, setComment] = useState("");
    let { commentInfo, success } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const newComment = {
            content: comment,
            parent: id,
        }

        console.log(`Commenting...`);
        dispatch(submitNewComment(newComment));
        // ev.stopPropagation();
    };

    useEffect(() => {
        if (commentInfo && success) {
            // reset comment state
            setComment("");
            dispatch(resetComment());
        }
    }, [commentInfo, success]);

    const postClick = (ev) => {
        ev.preventDefault();

        if (!ev.target.name || ev.target.name !== "comment") {
            navigate(`/post/${id}`);
        }
    }

    return (
        <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between flex-col">
            <div className="flex mb-2 justify-between">
                <div className="flex items-center">
                    <img
                        src={photoURL}
                        alt="avatar"
                        className={`flex w-10 h-10 rounded-full object-cover shadow-none shadow-black `}
                    />
                    <div className="font-bold ml-2">{user}</div>
                    <div className="ml-2">in</div>
                    <div className="font-bold ml-2">{location}</div>
                </div>
                <div className="flex items-center">
                    {dateObj !== null ? dateObj.toLocaleDateString() : "time"}
                </div>
            </div>
            <div
                className="flex flex-col bg-gray-200 rounded top-2"
                onClick={postClick}
                style={{cursor:"pointer"}}
            >
                <div className="font-bold m-2">{title}</div>
                <div className="mx-2">{content}</div>
                <div className="m-2">
                    {tags &&
                        tags.map((tag, index) => (
                            <Tag color={"red-400"} content={tag} name={tag} key={index} />
                        ))}
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <div className="border-black border-2 rounded w-[75%]">
                    <div className="flex items-center">
                        <input
                            type="text"
                            name={"comment"}
                            placeholder="Leave a comment"
                            className="border-opacity-0 shadow-none w-full"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <FiSend
                            size={30}
                            className="mx-2"
                            onClick={onSubmit}
                        />
                    </div>
                </div>
                <div className="flex justify-center align-middle items-center">
                    <BsHandThumbsUp
                        height={80}
                        width={80}
                        className="h-6 w-6 m-2"
                    />
                    <div id="num-likes">
                        {numLikes}
                    </div>
                    <BsHandThumbsDown
                        height={80}
                        width={80}
                        className="h-6 w-6 m-2"
                    />
                    <div id="num-dislikes">
                        {numDislikes}
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
