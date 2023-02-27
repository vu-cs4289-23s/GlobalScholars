import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import React, {useState, useEffect} from "react";

const ProgramPost = () => {

    const [postAnon, setPostAnon] = useState(false);

    const onClickPost = async () => {
        console.log("post");
    };

    const onClickTag = (e) => {
        console.log("you just clicked a tag");
    }

    return (
        <div className="flex w-auto bg-white mx-20 text-left pt-2 pb-6 px-4 rounded-lg my-4">
        <span className="text-[16px] w-full h-full">
            <form className="flex flex-col align-middle">
                {/* Post as */}
                <div className="flex gap-x-5 my-4">
                    <div className="font-bold">Post as:</div>
                    <div className="flex justify-between">
                        <div>
                            <input type="radio" id="current-user" checked={!postAnon} onChange={() => setPostAnon(!postAnon)} />
                            <label htmlFor="current-user"> (current user)</label>
                        </div>
                        <div>
                            <input type="radio" id="anon" checked={postAnon} onChange={() => setPostAnon(!postAnon)} />
                            <label htmlFor="anon"> Anonymous</label>
                        </div>
                    </div>
                </div>
                {/* Select Semester */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Select your semester of study</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </div>
                    <div className="flex relative m-2">
                        <div className="flex bg-white rounded-lg justify-center align-middle m-auto">
                            <div>
                                <select name="semester" id="semester" className="bg-white border-2 border-black rounded-lg m-2" placeholder="Select semester">
                                    <option>Fall</option>
                                    <option>Spring</option>
                                    <option>Summer</option>
                                    <option>Maymester</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Select Major */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Select your major of study</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </div>
                    <div className="flex relative m-2">
                        <div className="flex bg-white rounded-lg justify-center align-middle m-auto">
                            <div>
                                <select name="major" id="major" className="bg-white border-2 border-black rounded-lg m-2" placeholder="Select semester">
                                    <option>Computer Science</option>
                                    <option>Economics</option>
                                    <option>Math</option>
                                    <option>Human and Organizational Development (HOD)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Post Title */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Title</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </div>
                    <div className="flex relative m-2">
                        <input
                            className="flex flex-auto"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Post Title"
                        />
                    </div>
                </div>
                {/* Post Review */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Write a Review</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </div>
                    <div className="m-2 bg-gray-200 rounded-lg text-[12px]">
                        <p className="font-bold m-2">Guidelines</p>
                        <p className="mx-2 mb-2">Use of profanity and derogatory language is strictly prohibited. Posts containing content that is inappropriate will be removed by our moderators.</p>
                    </div>
                    <div className="flex relative m-2 h-32">
                        <input
                            className="flex flex-auto"
                            id="review"
                            name="review"
                            type="text"
                            placeholder="Your Review"
                        />
                    </div>
                </div>
                {/* Post Tags */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Tag Your Post</span>
                        <span className=""> 1-5 Required</span>
                        <span className="text-red-700">*</span>
                    </div>
                    <div className="flex flex-wrap m-2 text-[16px] gap-x-1.5">
                        <Tag content={"University Housing"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Host Family"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"No housing support"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Beautiful campus"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Great Location"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Lots of homework"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Get ready to read"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"So many papers"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Group projects"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Extra credit"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Not much homework"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Tough grading"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Test heavy"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Lecture heavy"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Beware of pop quizzes"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Participation matters"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Graded by few things"} color={"bg-red-400"} onClick={onClickTag} />
                        <Tag content={"Classes were a breeze"} color={"bg-red-400"} onClick={onClickTag} />
                    </div>
                </div>
                {/* Post Ratings */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Ratings</span>
                        <span className=""> (optional)</span>
                    </div>
                    {/* Overall */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Overall:</span>
                            </grid-cols-3>

                            {/*<label htmlFor="overall1"> 1 - Awful </label>*/}
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Awful </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="overall1"
                                    name="overall"
                                    value="1"
                                />
                                {/*<label htmlFor="overall2"> 2 </label>*/}
                                <input
                                    type="radio"
                                    id="overall2"
                                    name="overall"
                                    value="2"
                                />
                                {/*<label htmlFor="overall3"> 3 </label>*/}
                                <input
                                    type="radio"
                                    id="overall3"
                                    name="overall"
                                    value="3"
                                />
                                {/*<label htmlFor="overall4"> 4 </label>*/}
                                <input
                                    type="radio"
                                    id="overall4"
                                    name="overall"
                                    value="4"
                                />
                                {/*<label htmlFor="overall5"> 5 - Awesome </label>*/}
                                <input
                                    type="radio"
                                    id="overall2"
                                    name="overall"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Awesome </span>
                            </grid-cols-2>
                        </div>
                    </div>
                    {/* Classes */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Classes:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Difficult </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="class1"
                                    name="class"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="class2"
                                    name="class"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="class3"
                                    name="class"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="class4"
                                    name="class"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="class5"
                                    name="class"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Easy </span>
                            </grid-cols-2>
                        </div>
                    </div>
                    {/* Campus */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Campus:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Boring </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="campus1"
                                    name="campus"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="campus2"
                                    name="campus"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="campus3"
                                    name="campus"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="campus4"
                                    name="campus"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="campus5"
                                    name="campus"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Beautiful </span>
                            </grid-cols-2>
                        </div>
                    </div>
                    {/* Grading */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 mb-2 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Grading:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Difficult </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="grading1"
                                    name="grading"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="grading2"
                                    name="grading"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="grading3"
                                    name="grading"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="grading4"
                                    name="grading"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="grading5"
                                    name="grading"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Clear and Easy </span>
                            </grid-cols-2>
                        </div>
                    </div>
                </div>
                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        id="submitBtn"
                        type="submit"
                        onClick={onClickPost}
                    >
                        Post
                    </button>
                </div>
            </form>
        </span>

        </div>
    );
};

export default ProgramPost;
