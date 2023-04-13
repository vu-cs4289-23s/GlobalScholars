import React, { useState } from 'react';
import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi';

const TripCard = ({ city1, city2, rating, price, cheapestDates, imageUrl }) => {
  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex p-6 ml-4 mr-4 w-2/3">
      <div
        className="h-full w-48 bg-cover bg-center rounded-lg mr-4"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-col justify-between">
        <div className="mb-2">
          <h2 className="text-lg font-bold">{`${city1} - ${city2}`}</h2>
        </div>
        <div className="flex items-center mb-2">
          <div className="mr-2">
            <span className="text-sm text-gray-600">Rating:</span>
          </div>
          <div className="flex  justify-items-center text-2xl">
            <span className="text-yellow-600 mr-1 text-5xl">
              {rating >= 1 ? '★' : '☆'}
            </span>
            <span className="text-yellow-600 mr-1 text-5xl">
              {rating >= 2 ? '★' : '☆'}
            </span>
            <span className="text-yellow-600 mr-1 text-5xl">
              {rating >= 3 ? '★' : '☆'}
            </span>
            <span className="text-yellow-600 mr-1 text-5xl">
              {rating >= 4 ? '★' : '☆'}
            </span>
            <span className="text-yellow-600 mr-1 text-5xl">
              {rating >= 5 ? '★' : '☆'}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <p>{`Average Cost: ${price}`}</p>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <p>{`Cheapest Month: ${cheapestDates}`}</p>
        </div>
      </div>
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
  );
};

export default TripCard;
