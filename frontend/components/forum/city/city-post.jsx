import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitNewForumPost, resetPost } from "../../../redux/post/post-slice.js";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import images from "../../../../images.js";
import tw from "tailwind-styled-components";
import {city_tags} from "../../../../data.js";
import {BsStar, BsStarFill} from "react-icons/bs";
import {BsInfoCircleFill  } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';
import AffordabilityInfoIcon from "../../all-pages/pricing-guide.jsx";
import RatingInfoIcon from "../../all-pages/rating-guide.jsx";

export const MakePostBox = tw.div`
    flex 
    w-auto 
    bg-white 
    sm:mx-20 
    mx-4
    text-left 
    pt-2 
    pb-6 
    px-4 
    rounded-lg 
    my-4
    mb-28
`

export const FormInputSectionContainer = tw.div`
    flex
    border-black
    border-2
    rounded-lg
    flex-col
    my-1
`

export const FormInputSectionTitle = tw.div`
    mx-2
    my-0.5
`

export const GuidelinesBox = tw.div`
    mx-2
    bg-gray-200
    rounded-lg
    text-[12px]
`

export const FormTagContainer = tw.div`
    flex
    flex-wrap
    m-2
    text-[16px]
    gap-x-1.5
`

export const FormRatingContainer = tw.div`
    border-black 
    border-2 
    border-opacity-25 
    rounded-lg 
    mx-2 
    mb-2 
    space-x-0
`

const CityPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postInfo, success, loading } = useSelector((state) => state.post);

    let [postAnon, setPostAnon] = useState("current-user");

    const [overallRating, setOverallRating] = useState(undefined);
    const [affordabilityRating, setAffordabilityRating] = useState(undefined);
    let [tagsState, setTagsState] = useState([]);
  

    let [error, setError] = useState("");
    let [state, setState] = useState({
        title: "",
        content: "",
        tags: [],
        city: "",
        overall_rating: 0,
        affordability_rating: 0,
    });


    // For the location selector code
    const [locations, setLocations] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // dispatch geo-slice call here once locations are all in the DB

        setLocations(images);
    }, []);

    const onClickTag = (ev) => {
        //console.log(id);
        console.log(ev.target.id);
    }

    const tags = city_tags.map((tag, i) => {
        return (
            <Tag key={i} name={tag.id} content={tag.content} color={tag.color} onClick={onClickTag} />
        );
    });

    const onSubmit = (ev) => {
        ev.preventDefault();
        const post = {
            title: state.title,
            content: state.content,
            city: state.city,
        }
        console.log(`Posting...`);
        dispatch(submitNewForumPost(post));

        if (success) {
            const forumNav = state.city;
            // reset post state
            dispatch(resetPost());
            navigate(`/city/${forumNav}`);
        }
    };

    const onChange = (ev) => {
        setError("");
        // Update from form and clear errors
        setState({
            ...state,
            [ev.target.name]: ev.target.value,
        });
    };

    useEffect(() => {
        if (selected && selected !== "") {
            // grab just the city name and set its state
            const selectedCity = selected.split(",")[0].toLowerCase();
            setState({
                ...state,
                city: selectedCity,
            });
        }
    }, [selected]);

    return (
        <MakePostBox>
        <span className="text-[16px] w-full h-full">
            <form className="flex flex-col align-middle">
                {/* Select Name */}
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
                {/* Location/Program Selector */}
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
                            : "Select Location"}
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
                            placeholder="Enter location name"
                            className="placeholder:text-gray-700 p-2 outline-none"
                        />
                    </div>
                        {locations?.map((city) => (
                            <li
                                key={city?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                    ${
                                    city?.name?.toLowerCase() === selected?.toLowerCase() &&
                                    "bg-sky-600 text-white"
                                }
                    ${
                                    city?.name?.toLowerCase().startsWith(inputValue)
                                        ? "block"
                                        : "hidden"
                                }`}
                                onClick={() => {
                                    if (city?.name?.toLowerCase() !== selected.toLowerCase()) {
                                        setSelected(city?.name);
                                        setOpen(false);
                                        setInputValue("");
                                    }
                                }}
                            >
                                {city?.name}
                            </li>
                        ))}
                </ul>
                </div>
                </div>
                {/* Post Title */}
                <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Title</span>
                        <span className=""> (required)</span>
                        <span className="text-red-700">*</span>
                    </FormInputSectionTitle>
                    <div className="flex relative m-2">
                        <input
                            className="flex flex-auto"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Post Title"
                            onChange={onChange}
                            value={state.title}
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
                            className="flex flex-auto h-32"
                            id="review"
                            name="content"
                            type="text"
                            placeholder="Your Review"
                            onChange={onChange}
                            value={state.content}
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
                        <div className="m-2 flex text-center  align-middle">
                            <div className="w-[15%]">Overall Experience:</div>
                            {/*<div className="text-[10px]"> 1 - Awful </div>*/}
                            <div className="space-x-3 flex justify-center">
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
                                <RatingInfoIcon/>
                            </div>
                            {/*<div className="text-[10px]"> 5 - Awesome </div>*/}
                        </div>
                    </FormRatingContainer>
                    {/* Affordability */}
                    <FormRatingContainer>
                        <div className="m-2 flex text-center  align-middle">
                            <div className="w-[15%]">Affordability:</div>
                            <div className="space-x-3 flex justify-center">
                            {(affordabilityRating !== undefined && affordabilityRating >= 1) ? (
                                <FaDollarSign size={30} color={"rgb(11,155,29)"} onClick={() => setAffordabilityRating(1)} />
                            ) : (
                                <FaDollarSign size={30} onClick={() => setAffordabilityRating(1)} />
                            )}
                            {(affordabilityRating !== undefined && affordabilityRating >= 2) ? (
                                <FaDollarSign size={30} color={"rgb(11,155,29)"} onClick={() => setAffordabilityRating(2)} />
                            ) : (
                                <FaDollarSign size={30} onClick={() => setAffordabilityRating(2)} />
                            )}
                            {(affordabilityRating !== undefined && affordabilityRating >= 3) ? (
                                <FaDollarSign size={30} color={"rgb(11,155,29)"} onClick={() => setAffordabilityRating(3)} />
                            ) : (
                                <FaDollarSign size={30} onClick={() => setAffordabilityRating(3)} />
                            )}
                            <AffordabilityInfoIcon/>
                            </div>
                        </div>
                    </FormRatingContainer>
                </FormInputSectionContainer>
                {/* Post Date of travel */}
                <FormInputSectionContainer>
                    <FormInputSectionTitle>
                        <span className="font-bold">Date of travel</span>
                        <span className=""> (optional)</span>
                    </FormInputSectionTitle>
                    <div className="flex justify-between mx-2 my-1 mb-2">
                        <span>Trip Start</span>
                        <input type="date" id="trip-start" name="trip-start" />
                        <input type="date" id="trip-end" name="trip-end" />
                        <span>Trip End</span>
                    </div>
                </FormInputSectionContainer>
                {/* Submit */}
                <div className="flex justify-end mt-2">
                    <button id="submitBtn" type="submit" onClick={onSubmit}>
                        Post
                    </button>
                </div>
            </form>
        </span>
        </MakePostBox>
    );
};

export default CityPost;
