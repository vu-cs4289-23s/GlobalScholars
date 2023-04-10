import React from 'react';
import { useEffect, useState } from 'react';
import {
    BsBookmark,
    BsFillBookmarkFill,
    BsHandThumbsUp,
    BsHandThumbsUpFill,
    BsHandThumbsDown,
    BsHandThumbsDownFill,
} from 'react-icons/bs';
import Tag from '../forum/all-forums/tag.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    resetComment,
    submitNewComment,
} from '../../redux/comment/comment-slice.js';

const ForumPost = ({
                       key,
                       id,
                       username,
                       avatar,
                       program,
                       title,
                       content,
                       likes,
                       saves,
                       tags,
                       dislikes,
                       location,
                       comments,
                       date,
                   }) => {

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

    // comments
    let [comment, setComment] = useState('');
    let { commentInfo, success } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const newComment = {
            content: comment,
            parent: id,
        };

        console.log(`Commenting...`);
        dispatch(submitNewComment(newComment));
    };

    useEffect(() => {
        if (commentInfo && success) {
            // reset comment state
            setComment('');
            dispatch(resetComment());
        }
    }, [commentInfo, success]);

    const postClick = (ev) => {
        ev.preventDefault();

        if (!ev.target.name || ev.target.name !== 'comment') {
            navigate(`/post/${id}`);
        }
    };

    const userClick = (ev) => {
        if (username) {
            navigate(`/profile/${username}`);
        }
    };

    // TODO: check if the current user has liked, disliked, or saved the post, if so, change the icon

    return (
        <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between flex-col">
            <div className="flex mb-2 justify-between">
                <div className="flex items-center"
                onClick={userClick}
                style={{ cursor: 'pointer' }}
              >
                  <img
                    src={avatar}
                    className={`flex w-10 h-10 rounded-full object-cover shadow-none shadow-black `}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          'https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale';
                    }}
                  />

                  <div className="font-bold ml-2">{username}</div>
                  <div className="ml-2">in</div>
                  <div className="font-bold ml-2">{location}</div>
              </div>
              <div className="flex items-center">
                  {dateObj !== null ? dateObj.toLocaleDateString() : 'time'}
              </div>
          </div>
          <div
            className="flex flex-col bg-gray-200 rounded top-2"
            onClick={postClick}
            style={{ cursor: 'pointer' }}
          >
              <div className="font-bold m-2">{title}</div>
              <div className="mx-2">{content}</div>
              <div className="m-2">
                  {tags &&
                    tags.map((tag, index) => (
                      <Tag color={'red-400'} content={tag} name={tag} key={index} />
                    ))}
              </div>
          </div>
          <div className="flex justify-between">
              <form className="flex w-full">
          <textarea
            name={'comment'}
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
                    <div className="flex justify-center align-middle items-center">
                        <BsHandThumbsUp height={80} width={80} className="h-6 w-6 m-2" />
                        <div id="num-likes">{numLikes}</div>
                        <BsHandThumbsDown
                          height={80}
                          width={80}
                          className="h-6 w-6 m-2"
                        />
                        <div id="num-dislikes">{numDislikes}</div>
                        <BsBookmark height={80} width={80} className="h-6 w-6 m-2" />
                    </div>
                  )}
              </form>
          </div>
      </div>
    );
};

export default ForumPost;
