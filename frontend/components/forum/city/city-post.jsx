import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitNewForumPost, resetPost } from "../../../redux/post/post-slice.js";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const CityPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postInfo, success } = useSelector((state) => state.post);
    let [error, setError] = useState("");
    let [state, setState] = useState({
        // owner: "",
        // timestamp: Date.now(),
        title: "",
        content: "",
        tags: [],
        city: "",
        program_name: "",
        overall_rating: 0,
        safety_rating: 0,
        affordability_rating: 0,
        sightseeing_rating: 0,
        // top_tags; [],
    });

    // For the location selector code
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // dispatch geo-slice call here once locations are all in the DB

        setCountries([
            {name: "Barcelona, Spain",  src: "frontend/images/landing-locations/barcelona.jpg"},
            {name: "Copenhagen, Denmark", src: "frontend/images/landing-locations/copenhagen.jpeg"},
            {name: "Edinburgh, Scotland", src: "frontend/images/landing-locations/edinburgh.jpeg"},
            {name: "Florence, Italy", src:"frontend/images/landing-locations/florence.jpeg"},
            {name: "Glasgow, Scotland", src:"frontend/images/landing-locations/glasgow.jpeg"},
            {name: "London, United Kingdom", src:"frontend/images/landing-locations/london.jpeg"},
            {name: "Madrid, Spain", src:"frontend/images/landing-locations/madrid.jpeg"},
            {name: "Paris, France", src:"frontend/images/landing-locations/paris.jpeg"},
            {name: "Rome, Italy", src:"frontend/images/landing-locations/rome.jpeg"},
            {name: "Seville, Spain", src:"frontend/images/landing-locations/seville.jpeg"},
            {name: "Stockholm, Sweden", src:"frontend/images/landing-locations/stockholm.jpeg"},
            {name: "Prague, Czech Republic", src:"frontend/images/landing-locations/prague.jpeg"},
            {name: "Budapest, Hungary", src:"frontend/images/landing-locations/budapest.jpeg"},
            {name: "Vienna, Austria", src:"frontend/images/landing-locations/vienna.jpeg"},
        ]);
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const post = {
            title: state.title,
            content: state.content,
            city: state.city,
            program_name: state.program_name,
        }
        console.log(`Posting...`);
        dispatch(submitNewForumPost(post));
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

    useEffect(() => {
        if (postInfo && success) {
            // reset post state
            dispatch(resetPost());
            navigate("/forum");
        }
    }, [postInfo])

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
                            onChange={onChange}
                            value={state.title}
                        />
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
          {countries?.map((country) => (
            <li
              key={country?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
                country?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
            ${
                country?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => {
                  if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                      setSelected(country?.name);
                      setOpen(false);
                      setInputValue("");
                  }
              }}
            >
                {country?.name}
            </li>
          ))}
      </ul>
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
                            id="content"
                            name="content"
                            type="text"
                            placeholder="Your Review"
                            onChange={onChange}
                            value={state.content}
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
                                    name="overall_rating"
                                    value="1"
                                    onChange={onChange}
                                />
                                {/*<label htmlFor="overall2"> 2 </label>*/}
                                <input
                                    type="radio"
                                    id="overall2"
                                    name="overall_rating"
                                    value="2"
                                    onChange={onChange}
                                />
                                {/*<label htmlFor="overall3"> 3 </label>*/}
                                <input
                                    type="radio"
                                    id="overall3"
                                    name="overall_rating"
                                    value="3"
                                    onChange={onChange}
                                />
                                {/*<label htmlFor="overall4"> 4 </label>*/}
                                <input
                                    type="radio"
                                    id="overall4"
                                    name="overall_rating"
                                    value="4"
                                    onChange={onChange}
                                />
                                {/*<label htmlFor="overall5"> 5 - Awesome </label>*/}
                                <input
                                    type="radio"
                                    id="overall5"
                                    name="overall_rating"
                                    value="5"
                                    onChange={onChange}
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
                                    name="safety_rating"
                                    value="1"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="safety2"
                                    name="safety_rating"
                                    value="2"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="safety3"
                                    name="safety_rating"
                                    value="3"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="safety4"
                                    name="safety_rating"
                                    value="4"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="safety5"
                                    name="safety_rating"
                                    value="5"
                                    onChange={onChange}
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
                                    name="affordability_rating"
                                    value="1"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="affordability2"
                                    name="affordability_rating"
                                    value="2"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="affordability3"
                                    name="affordability_rating"
                                    value="3"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="affordability4"
                                    name="affordability_rating"
                                    value="4"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="affordability5"
                                    name="affordability_rating"
                                    value="5"
                                    onChange={onChange}
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
                                    name="sightseeing_rating"
                                    value="1"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="sights2"
                                    name="sightseeing_rating"
                                    value="2"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="sights3"
                                    name="sightseeing_rating"
                                    value="3"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="sights4"
                                    name="sightseeing_rating"
                                    value="4"
                                    onChange={onChange}
                                />
                                <input
                                    type="radio"
                                    id="sights5"
                                    name="sightseeing_rating"
                                    value="5"
                                    onChange={onChange}
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
                        onClick={onSubmit}
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
