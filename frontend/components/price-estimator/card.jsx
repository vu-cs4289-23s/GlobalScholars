import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi';
import { FaStar, FaDollarSign } from 'react-icons/fa';
import AffordabilityInfoIcon from '../all-pages/pricing-guide';


const Card = ({
  title,
  city,
  country,
  overall_rating,
  affordability_rating,
}) => {
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  const stars = [...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      size={20}
      color={overall_rating >= i + 1 ? 'rgb(255,215,0)' : 'rgb(211,211,211)'}
    />
  ));

  const affordabilityIcons = [...Array(3)].map((_, i) => (
    <FaDollarSign
      key={i}
      size={20}
      color={affordability_rating >= i + 1 ? 'rgb(11,155,29)' : 'rgb(211,211,211)'}
    />
  ));

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row m-6">
      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-32 md:rounded-none md:rounded-l-lg"
        src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
        alt=""
      />
      <div className="flex flex-col justify-start p-6 w-full h-full">
        <h5 className="w-full text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
          {city}, {country}
        </h5>
        <div className="flex flex-row justify-start items-center">
          <p className="text-base text-neutral-600 dark:text-neutral-200">Overall:</p>
          {stars}
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-base text-neutral-600 dark:text-neutral-200 leading-7">
            Affordability:
          </p>
          {affordabilityIcons}
          <AffordabilityInfoIcon />
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">Last updated 3 mins ago</p>
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