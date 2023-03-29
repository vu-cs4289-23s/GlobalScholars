import Reviews from "../components/profile-page/reviews.jsx";
import Comment from "../components/all-pages/comment.jsx";
import SideBar from "../components/all-pages/sidebar.jsx";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByIdAsyncAction } from "../redux/post/post-slice.js";

export default function PostPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    let { postInfo } = useSelector((state) => state.post);
    let [ post, setPost ] = useState({});
    let [ comments, setComments ] = useState([]);

    useEffect(() => {
        dispatch(getPostByIdAsyncAction(id));
    }, [id]);

    useEffect(() => {
        setPost(postInfo);
        setComments(postInfo.comments);
    }, [postInfo]);


    return(
        <div id="forum-page" className="flex h-screen w-screen bg-blue-rgba">
            <SideBar />
            <div className="flex-col w-full h-full items-start justify-start bg-blue-light">
                <div >
                    {post && post !== {} ? (
                        <div>
                            <Reviews
                                key={1}
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
                                date={post.timestamp}
                            />
                        </div>) : null}
                </div>
                <div className=" overflow-scroll h-[60%] sm:h-[65%] ">
                    { comments && comments.length > 0 ? (
                        <div>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    content={comment.content}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}