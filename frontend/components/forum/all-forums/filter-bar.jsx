import { RiFireFill, RiFilter2Fill } from 'react-icons/ri';
import { FaCrown, FaFilter } from 'react-icons/fa';
import { GiFallingStar } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import React, { useState } from 'react';
import { city_tags, program_tags } from '../../../../data.js';
import Tag from './tag.jsx';

const FilterBar = ({
  posts,
  setPosts,
  onClickAdvanced,
  showClear,
  onClickClear,
}) => {
  //sort posts most likes - least likes
  const handleAllTimeClick = () => {
    // Sort the posts in the database by most likes to least likes
    const sortedPosts = [...posts].sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      } else if (a.likes < b.likes) {
        return 1;
      } else {
        return 0;
      }
    });

    // Update the state of the parent component with the sorted posts
    setPosts(sortedPosts);
  };

  //sort posts newest-oldest
  const handleNewestClick = () => {
    // Sort the posts in the database by most recent post time to least recent post time
    const sortedPosts = [...posts].sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeB - timeA;
    });
    sortedPosts.reverse();
    // Update the state of the parent component with the sorted posts
    setPosts(sortedPosts);
  };

  return (
    <div className="flex rounded-lg bg-white sm:mx-20 mx-4 text-left p-2 px-4 my-4 sm:justify-between sm:flex-row flex-col">
      <div className="flex sm:space-x-3 sm:align-middle sm:justify-center my-auto">
        <div
          className="flex space-x-1.5"
          style={{ cursor: 'pointer' }}
          onClick={handleNewestClick}
        >
          <GiFallingStar size={28} />
          <div className="font-bold text-[20px]"> Newest</div>
        </div>
        <div
          className="flex space-x-1.5"
          style={{ cursor: 'pointer' }}
          onClick={handleAllTimeClick}
        >
          <FaCrown size={28} />
          <div className="font-bold text-[20px]"> All Time</div>
        </div>
      </div>
      <div className="ml-auto flex" style={{ cursor: 'pointer' }}>
        {showClear && (
          <div
            id="clearFilter"
            className="flex p-2 m-auto mr-1.5 text-gray-500"
            onClick={onClickClear}
          >
            <MdOutlineClose size={20} className="my-auto" />
            <div className="font-bold text-[16px]">Clear Filter</div>
          </div>
        )}
        <div
          id="filterBtn"
          className="flex border-black rounded-lg border-2 p-2 m-auto"
          onClick={onClickAdvanced}
        >
          <RiFilter2Fill size={24} className="my-auto" />
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

