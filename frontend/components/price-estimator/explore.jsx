import React from 'react';
import Card from './card';
import { useSelector } from 'react-redux';

const Explore = () => {
  const { tripInfo, success } = useSelector((state) => state.trip);

  return (
    <div className="flex  h-full w-full p-4 justify-center align-middle ">
      <div className=" flex flex-col h-full items-center justify-center">
        {success && tripInfo.trips.length > 0 ? (
          tripInfo.trips.map((trip) => (
            <Card
              key={trip.id}
              title={trip.title}
              overall_rating={trip.overall_rating}
              affordability_rating={trip.affordability_rating}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold text-gray-500">
              No trips found
            </h1>

            <p className="text-gray-500">
              Try searching for a different destination
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
