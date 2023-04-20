import { RiFireFill, RiFilter2Fill } from "react-icons/ri";
import { FaCrown, FaFilter } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import React from "react";

const FilterBar = ({  }) => {
    return (
        <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between sm:flex-row flex-col">
            <div className="flex sm:space-x-3 sm:align-middle sm:justify-center my-auto">
                <div className="flex space-x-1.5">
                    <GiFallingStar size={28} />
                    <div className="font-bold text-[20px]"> Newest</div>
                </div>
                {/*<div className="flex space-x-1.5">*/}
                {/*    <RiFireFill size={28} />*/}
                {/*    <div className="font-bold text-[20px]"> Trending</div>*/}
                {/*</div>*/}
                <div className="flex space-x-1.5">
                    <FaCrown size={28} />
                    <div className="font-bold text-[20px]"> All Time</div>
                </div>
            </div>
            <div>
                <div id="filterBtn" className="flex border-black rounded-lg border-2 p-2 m-auto">
                    <RiFilter2Fill size={24} />
                    <div className="font-bold text-[18px]">Advanced</div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
