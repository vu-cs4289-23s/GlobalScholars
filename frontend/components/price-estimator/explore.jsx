import React from 'react';
import Card from './card';
import images from '../../../images';
import { useSelector } from 'react-redux';

const Explore = () => {
  const { tripInfo, success } = useSelector((state) => state.trip);

  return (
    <div className="overflow-y-scroll h-full w-full">
      {success && tripInfo.cities.length > 0 ? (
        tripInfo.cities.map((trip) => {
          // if trip.city is in the string images[i].name, set image to images[i]
          // else set image to images['default']
          let image = {
            src: '/default_location.jpeg',
          };
          for (let i = 0; i < images.length; i++) {
            //case insensitive
            if (
              images[i].name.toLowerCase().includes(trip.city.toLowerCase())
            ) {
              image = images[i];
              break;
            }
          }

          return (
            <Card
              key={trip.id}
              title={trip.title}
              city={trip.city}
              image_link={image.src}
              country={trip.country}
              overall_rating={trip.avg_overall_rating}
              affordability_rating={trip.avg_affordability_rating}
            />
          );
        })
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
  );
};

export default Explore;
