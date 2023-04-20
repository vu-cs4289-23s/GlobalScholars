import { MdOutlineClose } from "react-icons/md";
import React, {useState} from "react";
import tw from "tailwind-styled-components";

export const TagContainer = tw.div`
    flex
    flex-wrap
    m-2
    text-[8px]
    gap-x-1.5
`;

const AdvancedFilter = ({ onClickX, onClickFilter, tags }) => {

    return (
        <div className="absolute z-10 p-2 bg-white border rounded shadow-md w-[40%] flex flex-col left-1/2">
            <div className="flex">
                <div className="text-md overflow-scroll items-start">
                    <div className="font-bold text-left ml-2">
                        Filter Posts by Tag:
                    </div>
                    <TagContainer>
                        {tags}
                    </TagContainer>
                </div>
                <div>
                    <MdOutlineClose onClick={onClickX} />
                </div>
            </div>
            <div className="ml-auto">
                <div
                    id="filterBtn"
                    className="flex border-black rounded-lg border-2 p-2 hover:bg-gray-200"
                    onClick={onClickFilter}
                >
                    <div className="font-bold text-md m-auto px-2">Filter</div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilter;