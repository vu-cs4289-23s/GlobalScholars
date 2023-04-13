import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import React, {useState, useEffect} from "react";
import tw from "tailwind-styled-components";
import CityPost, {MakePostBox, FormInputSectionContainer, FormInputSectionTitle, GuidelinesBox, FormTagContainer, FormRatingContainer} from "../city/city-post.jsx";
import {program_tags} from "../../../../data.js";
import { BsStar, BsStarFill } from "react-icons/bs"
import { resetPost } from "../../../redux/post/post-slice.js";
import { useDispatch, useSelector } from "react-redux";
import data from "../../../../data.js";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const ProgramPost = () => {
  let [state, setState] = useState({
    program_name: "",
    semester: "",
    major: "",
    title: "",
    content: "",
    tags: [],
    overall_rating: 0,
  });
  const [postAnon, setPostAnon] = useState(false);
  const [overallRating, setOverallRating] = useState(undefined);
  const [classesRating, setClassesRating] = useState(undefined);
  const [campusRating, setCampusRating] = useState(undefined);
  const [gradingRating, setGradingRating] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postInfo, success, loading } = useSelector((state) => state.post);

  // For the program selector
  const [programs, setPrograms] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const onClickTag = (e) => {
    console.log("you just clicked a tag");
  }

  const tags = program_tags.map((tag, i) => {
    return (
      <Tag key={i} name={tag.id} content={tag.content} color={tag.color} onClick={onClickTag} />
    );
  });

  const onChange = (ev) => {
    // Update from form and clear errors
    setState({
      ...state,
      [ev.target.name]: ev.target.value,
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const post = {
      title: state.title,
      content: state.content,
      program_name: state.program_name,
    }
    console.log(`Posting...`);
    dispatch(submitNewForumPost(post));

    if (success) {
      const forumNav = state.program_name;
      // reset post state
      dispatch(resetPost());
      navigate(`/program/${forumNav}`);
    }
  };

  useEffect(() => {
    let programList = [];
    data.map((value,index) => {
      programList.push(value["Program Name"]);
    });
    setPrograms(programList);
  }, []);

  useEffect(() => {
    if (selected && selected !== "") {
      setState({
        ...state,
        program_name: selected,
      });
    }
  }, [selected]);

  return (
    <MakePostBox>
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
              {/* Program Selector */}
              <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className={open ? "w-100 font-medium h-80": "w-100 font-medium h-10"}>
                        <div
                          onClick={() => setOpen(!open)}
                          className={`bg-white w-full p-2 flex items-center justify-between rounded ${
                            !selected && "text-gray-700"
                          }`}
                        >
                        {selected
                          ? selected?.length > 25
                            ? selected?.substring(0, 25) + "..."
                            : selected
                          : "Select Program"}
                          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
                    </div>
                    <ul
                      className={`bg-white mt-2 overflow-y-auto ${
                        open ? "max-h-60" : "max-h-0"
                      } `}
                    >
                    <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                          placeholder="Enter program name"
                          className="placeholder:text-gray-700 p-2 outline-none"
                        />
                    </div>
                      {programs?.map((program) => (
                        <li
                          key={program}
                          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                    ${
                            program?.toLowerCase() === selected?.toLowerCase() &&
                            "bg-sky-600 text-white"
                          }
                    ${
                            program?.toLowerCase().startsWith(inputValue)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            if (program?.toLowerCase() !== selected.toLowerCase()) {
                              setSelected(program);
                              setOpen(false);
                              setInputValue("");
                            }
                          }}
                        >
                          {program}
                        </li>
                      ))}
                </ul>
                </div>
                </div>
              {/* Select Major */}
              <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Select your major of study</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </FormInputSectionTitle>
                    <div className="flex relative m-2">
                        <div className="flex bg-white rounded-lg justify-center align-middle m-auto">
                            <div>
                                <select name="major" id="major" className="bg-white border-2 border-black rounded-lg m-2" placeholder="Select major">
                                    <option>Computer Science</option>
                                    <option>Economics</option>
                                    <option>Math</option>
                                    <option>Human and Organizational Development (HOD)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </FormInputSectionContainer>
              {/* Post Title */}
              <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Title</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </FormInputSectionTitle>
                    <div className="flex relative m-2">
                        <input
                          onChange={onChange}
                          value={state.title}
                          className="flex flex-auto"
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Post Title"
                        />
                    </div>
                </FormInputSectionContainer>
              {/* Post Review */}
              <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Write a Review</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </FormInputSectionTitle>
                    <GuidelinesBox>
                        <p className="font-bold m-2">Guidelines</p>
                        <p className="mx-2 mb-2">Use of profanity and derogatory language is strictly prohibited. Posts containing content that is inappropriate will be removed by our moderators.</p>
                    </GuidelinesBox>
                    <div className="flex relative m-2">
                        <input
                          onChange={onChange}
                          value={state.content}
                          className="flex flex-auto h-32"
                          id="review"
                          name="content"
                          type="text"
                          placeholder="Your Review"
                        />
                    </div>
                </FormInputSectionContainer>
              {/* Post Tags */}
              <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Tag Your Post</span>
                        <span className=""> 1-5 Required</span>
                        <span className="text-red-700">*</span>
                    </FormInputSectionTitle>
                    <FormTagContainer>
                        {tags}
                    </FormTagContainer>
                </FormInputSectionContainer>
              {/* Post Ratings */}
              <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Ratings</span>
                        <span className=""> (optional)</span>
                    </FormInputSectionTitle>
                {/* Overall */}
                <FormRatingContainer>
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Overall:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Awful </span>
                            </grid-cols-2>
                            <div className="space-x-3 flex justify-around">
                                {(overallRating !== undefined && overallRating >= 1) ?
                                  <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setOverallRating(1)} /> :
                                  <BsStar size={30} onClick={() => setOverallRating(1)} /> }
                              {(overallRating !== undefined && overallRating >= 2) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setOverallRating(2)} /> :
                                <BsStar size={30} onClick={() => setOverallRating(2)} /> }
                              {(overallRating !== undefined && overallRating >= 3) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setOverallRating(3)} /> :
                                <BsStar size={30} onClick={() => setOverallRating(3)} /> }
                              {(overallRating !== undefined && overallRating >= 4) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setOverallRating(4)} /> :
                                <BsStar size={30} onClick={() => setOverallRating(4)} /> }
                              {(overallRating !== undefined && overallRating >= 5) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setOverallRating(5)} /> :
                                <BsStar size={30} onClick={() => setOverallRating(5)} /> }
                            </div>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Awesome </span>
                            </grid-cols-2>
                        </div>
                    </FormRatingContainer>
                {/* Classes */}
                <FormRatingContainer>
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Classes:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Difficult </span>
                            </grid-cols-2>
                            <div className="space-x-3 flex justify-around">
                                {(classesRating !== undefined && classesRating >= 1) ?
                                  <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setClassesRating(1)} /> :
                                  <BsStar size={30} onClick={() => setClassesRating(1)} /> }
                              {(classesRating !== undefined && classesRating >= 2) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setClassesRating(2)} /> :
                                <BsStar size={30} onClick={() => setClassesRating(2)} /> }
                              {(classesRating !== undefined && classesRating >= 3) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setClassesRating(3)} /> :
                                <BsStar size={30} onClick={() => setClassesRating(3)} /> }
                              {(classesRating !== undefined && classesRating >= 4) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setClassesRating(4)} /> :
                                <BsStar size={30} onClick={() => setClassesRating(4)} /> }
                              {(classesRating !== undefined && classesRating >= 5) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setClassesRating(5)} /> :
                                <BsStar size={30} onClick={() => setClassesRating(5)} /> }
                            </div>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Easy </span>
                            </grid-cols-2>
                        </div>
                    </FormRatingContainer>
                {/* Campus */}
                <FormRatingContainer>
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Campus:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Boring </span>
                            </grid-cols-2>
                            <div className="space-x-3  flex justify-around">
                                {(campusRating !== undefined && campusRating >= 1) ?
                                  <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setCampusRating(1)} /> :
                                  <BsStar size={30} onClick={() => setCampusRating(1)} /> }
                              {(campusRating !== undefined && campusRating >= 2) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setCampusRating(2)} /> :
                                <BsStar size={30} onClick={() => setCampusRating(2)} /> }
                              {(campusRating !== undefined && campusRating >= 3) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setCampusRating(3)} /> :
                                <BsStar size={30} onClick={() => setCampusRating(3)} /> }
                              {(campusRating !== undefined && campusRating >= 4) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setCampusRating(4)} /> :
                                <BsStar size={30} onClick={() => setCampusRating(4)} /> }
                              {(campusRating !== undefined && campusRating >= 5) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setCampusRating(5)} /> :
                                <BsStar size={30} onClick={() => setCampusRating(5)} /> }
                            </div>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Beautiful </span>
                            </grid-cols-2>
                        </div>
                    </FormRatingContainer>
                {/* Grading */}
                <FormRatingContainer>
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Grading:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Difficult </span>
                            </grid-cols-2>
                            <div className="space-x-3 flex justify-around">
                                {(gradingRating !== undefined && gradingRating >= 1) ?
                                  <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setGradingRating(1)} /> :
                                  <BsStar size={30} onClick={() => setGradingRating(1)} /> }
                              {(gradingRating !== undefined && gradingRating >= 2) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setGradingRating(2)} /> :
                                <BsStar size={30} onClick={() => setGradingRating(2)} /> }
                              {(gradingRating !== undefined && gradingRating >= 3) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setGradingRating(3)} /> :
                                <BsStar size={30} onClick={() => setGradingRating(3)} /> }
                              {(gradingRating !== undefined && gradingRating >= 4) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setGradingRating(4)} /> :
                                <BsStar size={30} onClick={() => setGradingRating(4)} /> }
                              {(gradingRating !== undefined && gradingRating >= 5) ?
                                <BsStarFill size={30} color={"rgb(245, 235, 163)"} onClick={() => setGradingRating(5)} /> :
                                <BsStar size={30} onClick={() => setGradingRating(5)} /> }
                            </div>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Clear and Easy </span>
                            </grid-cols-2>
                        </div>
                    </FormRatingContainer>
                </FormInputSectionContainer>
              {/* Submit */}
              <div className="flex justify-end">
                    <button
                      onClick={onSubmit}
                      id="submitBtn"
                      type="submit"
                    >
                        Post
                    </button>
                </div>
            </form>
        </span>
    </MakePostBox>
  );
};

export default ProgramPost;
