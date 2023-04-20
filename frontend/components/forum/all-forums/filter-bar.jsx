import { RiFireFill, RiFilter2Fill } from "react-icons/ri";
import { FaCrown, FaFilter } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import React, {useState} from "react";
import { city_tags, program_tags } from '../../../../data.js';
import Tag from "./tag.jsx";

const FilterBar = ({ onClickAdvanced }) => {

    // let [showAdvancedBox, setShowAdvanced] = useState(false);
    //
    // let tags = undefined;
    //
    // if (city) {
    //     tags = city_tags.map((tag, i) => {
    //         return (
    //             <Tag key={i} id={tag.id} opacity={100} />
    //         );
    //     })
    // } else {
    //     tags = program_tags.map((tag, i) => {
    //         return (
    //             <Tag key={i} id={tag.id} opacity={100} />
    //         );
    //     })
    // }

    return (
        <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between sm:flex-row flex-col">
            <div className="flex sm:space-x-3 sm:align-middle sm:justify-center my-auto">
                <div className="flex space-x-1.5">
                    <GiFallingStar size={28} />
                    <div className="font-bold text-[20px]"> Newest</div>
                </div>
                <div className="flex space-x-1.5">
                    <RiFireFill size={28} />
                    <div className="font-bold text-[20px]"> Trending</div>
                </div>
                <div className="flex space-x-1.5">
                    <FaCrown size={28} />
                    <div className="font-bold text-[20px]"> All Time</div>
                </div>
            </div>
            <div className="ml-auto">
                <div
                    id="filterBtn"
                    className="flex border-black rounded-lg border-2 p-2 m-auto"
                    onClick={onClickAdvanced}
                >
                    <RiFilter2Fill size={24} />
                    <div className="font-bold text-[18px]">Advanced</div>
                </div>
                {/*{showAdvancedBox && (*/}
                {/*    <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-md flex w-[30%] overflow-y-scroll overflow-hidden">*/}
                {/*        <div className="text-sm w-[90%]">*/}
                {/*            <div className="text-bold">*/}
                {/*                Filter Posts by Tag:*/}
                {/*            </div>*/}
                {/*            <div className=" space-x-1.5">*/}
                {/*                {tags}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <MdOutlineClose onClick={() => setShowAdvanced(false)} />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

        </div>
    );
};

export default FilterBar;
