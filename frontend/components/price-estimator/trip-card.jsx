import React from 'react';

const Card = ({ city1, city2, rating, price, cheapestDates, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg flex p-6 ml-4 mr-4 h-48">
      <div
        className="h-full w-48 bg-cover bg-center rounded-lg mr-4"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-col justify-between">
        <div className="mb-2">
          <h2 className="text-lg font-bold">{`${city1} - ${city2}`}</h2>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex ml-10 justify-items-center text-2xl">
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
          <p>{`Cheapest Dates: ${cheapestDates}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;


