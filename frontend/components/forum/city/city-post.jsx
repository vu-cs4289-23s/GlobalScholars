import { useLocation, useParams, useNavigate } from "react-router-dom";
import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";
import ProgramLink from "../all-forums/program-link.jsx";

const CityPost = () => {
    const navigate = useNavigate();
    return (
        <div className="flex bg-gray-50 bg-opacity-50 mx-20 text-left pt-2 pb-6 px-4 rounded-lg my-4">
            <grid-cols-1>
        <span className="text-[30px]">
          Make a Post
            <form className="flex flex-col align-middle">
                <div>
                    <label htmlFor="title">Title (required)</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Post Title"
                    />
                </div>
                <div>
                    <label htmlFor="review">Review (required)</label>
                    <input
                        id="review"
                        name="review"
                        type="text"
                        placeholder="Your Review"
                    />
                </div>
                <div>
                    <div>
                        <span>Tag Your Post</span>
                        <span>1-5 Required</span>
                    </div>
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
                <div>
                    <span>Ratings (optional)</span>
                    <div>
                        <span>Overall:</span>
                        <label htmlFor="overall1"> 1 - Awful </label>
                        <input
                            type="radio"
                            id="overall1"
                            name="overall"
                            value="1"
                        />
                        <label htmlFor="overall2"> 2 </label>
                        <input
                            type="radio"
                            id="overall2"
                            name="overall"
                            value="2"
                        />
                        <label htmlFor="overall3"> 3 </label>
                        <input
                            type="radio"
                            id="overall3"
                            name="overall"
                            value="3"
                        />
                        <label htmlFor="overall4"> 4 </label>
                        <input
                            type="radio"
                            id="overall4"
                            name="overall"
                            value="4"
                        />
                        <label htmlFor="overall5"> 5 - Awesome </label>
                        <input
                            type="radio"
                            id="overall2"
                            name="overall"
                            value="5"
                        />
                    </div>
                    <div>
                        <span>Safety:</span>
                        <label htmlFor="safety1"> 1 - Dangerous </label>
                        <input
                            type="radio"
                            id="safety1"
                            name="safety"
                            value="1"
                        />
                        <label htmlFor="safety2"> 2 </label>
                        <input
                            type="radio"
                            id="safety2"
                            name="safety"
                            value="2"
                        />
                        <label htmlFor="safety3"> 3 </label>
                        <input
                            type="radio"
                            id="safety3"
                            name="safety"
                            value="3"
                        />
                        <label htmlFor="safety4"> 4 </label>
                        <input
                            type="radio"
                            id="safety4"
                            name="safety"
                            value="4"
                        />
                        <label htmlFor="safety5"> 5 - Very Safe </label>
                        <input
                            type="radio"
                            id="safety5"
                            name="safety"
                            value="5"
                        />
                    </div>
                    <div>
                        <span>Affordability:</span>
                        <label htmlFor="affordability1"> 1 - Overpriced </label>
                        <input
                            type="radio"
                            id="affordability1"
                            name="affordability"
                            value="1"
                        />
                        <label htmlFor="affordability2"> 2 </label>
                        <input
                            type="radio"
                            id="affordability2"
                            name="affordability"
                            value="2"
                        />
                        <label htmlFor="affordability3"> 3 </label>
                        <input
                            type="radio"
                            id="affordability3"
                            name="affordability"
                            value="3"
                        />
                        <label htmlFor="affordability4"> 4 </label>
                        <input
                            type="radio"
                            id="affordability4"
                            name="affordability"
                            value="4"
                        />
                        <label htmlFor="affordability5"> 5 - Cheap </label>
                        <input
                            type="radio"
                            id="affordability5"
                            name="affordability"
                            value="5"
                        />
                    </div>
                    <div>
                        <span>Sight Seeing:</span>
                        <label htmlFor="sights1"> 1 - Boring </label>
                        <input
                            type="radio"
                            id="sights1"
                            name="sights"
                            value="1"
                        />
                        <label htmlFor="sights2"> 2 </label>
                        <input
                            type="radio"
                            id="sights2"
                            name="sights"
                            value="2"
                        />
                        <label htmlFor="sights3"> 3 </label>
                        <input
                            type="radio"
                            id="sights3"
                            name="sights"
                            value="3"
                        />
                        <label htmlFor="sights4"> 4 </label>
                        <input
                            type="radio"
                            id="sights4"
                            name="sights"
                            value="4"
                        />
                        <label htmlFor="sights5"> 5 - Lots to see </label>
                        <input
                            type="radio"
                            id="sights5"
                            name="sights5"
                            value="5"
                        />
                    </div>
                </div>
                <div>
                    <span>Date of travel</span>
                    <span> (optional)</span>
                    <label htmlFor="trip-start">Trip Start:</label>
                    <input
                        type="date"
                        id="trip-start"
                        name="trip-start"
                    />
                    <label htmlFor="trip-end">Trip end:</label>
                    <input
                        type="date"
                        id="trip-end"
                        name="trip-end"
                    />
                </div>
                <div>
                    <button
                        id="submitBtn"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </span>

            </grid-cols-1>
        </div>
    );
};

export default CityPost;
