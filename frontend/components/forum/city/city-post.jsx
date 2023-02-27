import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import React, {useState, useEffect} from "react";

const CityPost = () => {

    const [title, setTitle] = useState("");
    const [review, setReview] = useState("1");
    const [color, setColor] = useState("red");

    const [overallRating, setOverallRating] = useState(0);
    const [safetyRating, setSafetyRating] = useState(0);
    const [affordabilityRating, setAffordabilityRating] = useState(0);
    const [sightsRating, setSightsRating] = useState(0);

    const onClickPost = async () => {
        console.log("post");
    };

    return (
        <div className="flex w-full bg-white mx-20 text-left pt-2 pb-6 px-4 rounded-lg my-4 overflow-y-scroll">
            <grid-cols-1>
                <div>photo</div>
            </grid-cols-1>
            <grid-cols-11>
        <span className="text-[16px] w-full h-full">
          Make a Post
            <form className="flex flex-col align-middle">
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
                    <div className="m-2 bg-gray-200 rounded-lg text-[10px]">
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
                    <div className="m-2 text-[16px]">
                        <input
                            type="checkbox"
                            id="weekend-trip"
                            name="weekend-trip"
                            value="Weekend Trip"
                        />
                        <label htmlFor="weekend-trip">Weekend Trip</label>
                        <input
                            type="checkbox"
                            id="day-trip"
                            name="day-trip"
                            value="Day Trip"
                        />
                        <label htmlFor="day-trip">Day Trip</label>
                        <input
                            type="checkbox"
                            id="favorite-city"
                            name="favorite-city"
                            value="Favorite City"
                        />
                        <label htmlFor="favorite-city">Favorite City</label>
                        <input
                            type="checkbox"
                            id="never-going-back"
                            name="never-going-back"
                            value="Never Going Back"
                        />
                        <label htmlFor="never-going-back">Never Going Back</label>
                        <input
                            type="checkbox"
                            id="lots-of-history"
                            name="lots-of-history"
                            value="Lots of history"
                        />
                        <label htmlFor="lots-of-history">Lots of history</label>
                        <input
                            type="checkbox"
                            id="great-hostels"
                            name="great-hostels"
                            value="Great hostels"
                        />
                        <label htmlFor="great-hostels">Great hostels</label>
                        <input
                            type="checkbox"
                            id="awesome-nightlife"
                            name="awesome-nightlife"
                            value="Awesome nightlife"
                        />
                        <label htmlFor="awesome-nightlife">Awesome nightlife</label>
                        <input
                            type="checkbox"
                            id="beautiful-scenery"
                            name="beautiful-scenery"
                            value="Beautiful Scenery"
                        />
                        <label htmlFor="beautiful-scenery">Beautiful scenery</label>
                        <input
                            type="checkbox"
                            id="amazing-eats"
                            name="amazing-eats"
                            value="Amazing eats"
                        />
                        <label htmlFor="amazing-eats">Amazing eats</label>
                        <input
                            type="checkbox"
                            id="overpriced"
                            name="overpriced"
                            value="Overpriced"
                        />
                        <label htmlFor="overpriced">Overpriced</label>
                        <input
                            type="checkbox"
                            id="affordable"
                            name="affordable"
                            value="Affordable"
                        />
                        <label htmlFor="affordable">Affordable</label>
                        <input
                            type="checkbox"
                            id="kinda-pricey"
                            name="kinda-pricey"
                            value="Kinda Pricey"
                        />
                        <label htmlFor="kinda-pricey">Kinda Pricey</label>
                        <input
                            type="checkbox"
                            id="walkable"
                            name="walkable"
                            value="Walkable"
                        />
                        <label htmlFor="walkable">Walkable</label>
                        <input
                            type="checkbox"
                            id="hard-to-get-around"
                            name="hard-to-get-around"
                            value="Hard to get around"
                        />
                        <label htmlFor="hard-to-get-around">Hard to get around</label>
                        <input
                            type="checkbox"
                            id="great-public-transit"
                            name="great-public-transit"
                            value="Great public transit"
                        />
                        <label htmlFor="great-public-transit">Great public transit</label>
                        <input
                            type="checkbox"
                            id="hold-onto-your-stuff"
                            name="hold-onto-your-stuff"
                            value="Hold onto your stuff"
                        />
                        <label htmlFor="hold-onto-your-stuff">Hold onto your stuff!</label>
                        <input
                            type="checkbox"
                            id="watch-for-scams"
                            name="watch-for-scams"
                            value="Watch for scams"
                        />
                        <label htmlFor="watch-for-scams">Watch for scams!</label>
                        <input
                            type="checkbox"
                            id="not-safe"
                            name="not-safe"
                            value="not-safe-at-night"
                        />
                        <label htmlFor="not-safe">Not safe at night</label>
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
                    {/* Safety */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Safety:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Dangerous </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="safety1"
                                    name="safety"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="safety2"
                                    name="safety"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="safety3"
                                    name="safety"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="safety4"
                                    name="safety"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="safety5"
                                    name="safety"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Very Safe </span>
                            </grid-cols-2>
                        </div>
                    </div>
                    {/* Affordability */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Affordability:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Overpriced </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="affordability1"
                                    name="affordability"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="affordability2"
                                    name="affordability"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="affordability3"
                                    name="affordability"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="affordability4"
                                    name="affordability"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="affordability5"
                                    name="affordability"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Cheap </span>
                            </grid-cols-2>
                        </div>
                    </div>
                    {/* Sights */}
                    <div className="border-black border-2 border-opacity-25 rounded-lg mx-2 my-1 mb-2 space-x-0">
                        <div className="m-2 flex justify-between">
                            <grid-cols-3 className="">
                                <span className="">Sightseeing:</span>
                            </grid-cols-3>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 1 - Boring </span>
                            </grid-cols-2>
                            <grid-cols-5 className="space-x-3">
                                <input
                                    type="radio"
                                    id="sights1"
                                    name="sights"
                                    value="1"
                                />
                                <input
                                    type="radio"
                                    id="sights2"
                                    name="sights"
                                    value="2"
                                />
                                <input
                                    type="radio"
                                    id="sights3"
                                    name="sights"
                                    value="3"
                                />
                                <input
                                    type="radio"
                                    id="sights4"
                                    name="sights"
                                    value="4"
                                />
                                <input
                                    type="radio"
                                    id="sights5"
                                    name="sights5"
                                    value="5"
                                />
                            </grid-cols-5>
                            <grid-cols-2 className="">
                                <span className="text-[10px]"> 5 - Lots to see </span>
                            </grid-cols-2>
                        </div>
                    </div>
                </div>
                {/* Post Date of travel */}
                <div className="flex border-black border-2 rounded-lg flex-col my-1">
                    <div className="mx-2 my-0.5">
                        <span className="font-bold">Date of travel</span>
                        <span className=""> (optional)</span>
                    </div>
                    <div className="flex justify-between mx-2 my-1 mb-2">
                        <span>Trip Start</span>
                        <input
                            type="date"
                            id="trip-start"
                            name="trip-start"
                        />
                        <input
                            type="date"
                            id="trip-end"
                            name="trip-end"
                        />
                        <span>Trip End</span>
                    </div>
                    {/*<label htmlFor="trip-start">Trip Start:</label>*/}

                    {/*<label htmlFor="trip-end">Trip end:</label>*/}

                </div>
                <div>
                    <button
                        id="submitBtn"
                        type="submit"
                        onClick={onClickPost}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </span>
            </grid-cols-11>

        </div>
    );
};

export default CityPost;
