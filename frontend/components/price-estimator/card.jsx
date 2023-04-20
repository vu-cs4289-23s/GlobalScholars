import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';

const Card = ({
  title,
  city,
  image_link,
  country,
  overall_rating,
  affordability_rating,
}) => {
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  return (
    <div class="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row m-6">
      <img
        class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-32 md:rounded-none md:rounded-l-lg"
        src={image_link}
        alt="/default_location.jpeg"
      />
      <div class="flex flex-col justify-start p-6 w-full h-full">
        <h5 class="w-full text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
          {city}, {country}
        </h5>
        <div className="flex flex-row  justify-start items-center">
          <p class="text-base text-neutral-600 dark:text-neutral-200">
            Overall:
          </p>
          {[1, 2, 3, 4, 5].map((num) => (
            <div className="text-yellow-600 mr-1 my-0 py-0 text-3xl sm:text-4xl">
              {overall_rating >= num ? '★' : <></>}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-start items-center ">
          <p class="text-base text-neutral-600 dark:text-neutral-200 leading-7">
            Affordability:
          </p>
          {[1, 2, 3].map((num) => (
            <div className="text-yellow-600 mr-1 text-3xl sm:text-4xl leading-7">
              {affordability_rating >= num ? (
                <FaDollarSign size={30} color={'rgb(11,155,29)'} />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        <p class="text-xs text-neutral-500 dark:text-neutral-300">
          Last updated 3 mins ago
        </p>
        <div className="flex justify-end items-end w-full">
          {saved ? (
            <BiBookmarkMinus
              className="text-black text-3xl cursor-pointer align-bottom justify-end"
              onClick={handleSaveClick}
            />
          ) : (
            <BiBookmarkPlus
              className="text-black text-3xl cursor-pointer align-baseline justify-end"
              onClick={handleSaveClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
