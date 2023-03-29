import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
<<<<<<< HEAD
import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi';
import { useState } from "react";
import Tag from "../forum/all-forums/tag";
=======
import { BsBookmark, BsBookmarkFill, BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import Tag from "../forum/all-forums/tag";
import { useDispatch, useSelector } from "react-redux";
import { submitNewComment, resetComment } from "../../redux/comment/comment-slice.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 3aaabaa465b49e872f15dcdcd322bed73853226d

const Reviews = ({
  key,
  id,
  username,
  program,
  location,
  content,
  likes,
  saves,
  tags,
  dislikes,
  date,
  type,
  comments,
}) => {
  const colorScheme = ["blue", "amber", "pink", "rose", "indigo", "pink"];
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  
  let [comment, setComment] = useState("");
  let { commentInfo, success } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //allow for bookmark of post:
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(!saved);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newComment = {
      content: comment,
      parent: id,
    }

    console.log(`Commenting...`);
    dispatch(submitNewComment(newComment));
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
    <div
      className="flex w-full overflow-visible flex-row sm:h-auto justify-center items-center sm:w-auto h-72 "
      id="background"
      key={key}
    >
      <div
        className="flex flex-row w-[90%] h-[30vh] m-4 bg-white  justify-center items-center rounded-md shadow-lg shadow-gray-700"
        id="container"
        onClick={postClick}
        style={{cursor:"pointer"}}
      >
        <div
          className="flex flex-1 flex-col w-64 h-full items-center justify-center   m-4"
          id="image container"
        >
          <img
            src="https://www.nationsonline.org/gallery/France/View-of-Versailles.jpg"
            alt="avatar"
            className={`flex w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24  ${
              type === "review" ? "rounded-md" : "rounded-full"
            } object-cover shadow-lg shadow-black `}
          />
          {type === "review" ? (
            <p className=" mt-4 text-center">{location}</p>
          ) : (
            <div className="flex flex-col">
              <p className=" mt-4 text-left text-xs">{username}</p>
              <p className=" mt-4 text-left text-xs">{program}</p>
              <p className=" mt-4 text-left text-xs">{date}</p>
            </div>
          )}
        </div>
        <div
          className="flex flex-row w-[80%] h-[90%] rounded-md m-4"
          id="reviews container"
        >
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div
              className="flex flex-col w-[90%] h-[70%] text-left bg-gray-200 rounded relative top-2"
              id="reviews content"
            >
              <div className="flex flex-col w-full h-full items-start justify-start">
                <p className="flex p-4 text-sm sm:text-base">{content}</p>
              </div>
              <div className="flex flex-wrap w-full">
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, key) => (
                    <div key={key} className="flex mx-1">
                      <Tag
                        content={tag}
                        color={
                          "bg-" + colorScheme[key % colorScheme.length] + "-300"
                        }
                        onClick={() => console.log("clicked")}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-row w-[90%] h-auto text-left  rounded relative top-2">
              <form className="flex w-full">
                <textarea
                  name={"comment"}
                  placeholder="Leave a comment"
                  className=" h-[50%] w-full flex justify-start relative top-4 rounded-md focus:scale-[102%] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:ease-linear transition-all duration-300 ease-in-out "
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                {comment.length > 0 ? (
                  <button
                    className="flex justify-center items-center h-10 w-10 rounded-full bg-blue-600 text-white relative  left-0 top-0 mx-2 mt-2"
                    type="submit"
                    onClick={onSubmit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                ) : (
                  <div
                    className="flex justify-center items-center px-2"
                    id="icons"
                  >
                    <FaThumbsUp height={80} width={80} className="h-6 w-6" />
                    <FaThumbsDown height={80} width={80} className="h-6 w-6 ml-2"/>
                    <button onClick={handleSave} style={{ color: 'black', border: 0 }}>
                      {saved ? <BiBookmarkMinus /> : <BiBookmarkPlus />}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
