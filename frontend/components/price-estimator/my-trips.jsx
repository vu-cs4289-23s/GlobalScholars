import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAsyncAction } from '../../redux/user/user-slice';
import Card from './card.jsx';
import images from '../../../images';

const MyTrips = ({ setTab }) => {
  const { userInfo, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsyncAction(userInfo.username));
  }, []);

  return (
    <div className="overflow-y-scroll w-full h-full">
      {userInfo.saves ? (
        userInfo.saves.map((post) => {
          // its not a trip
          if (post.location === null) return null;
          const location = post.location;
          const city = location.city;
          const country = location.country;
          let image = {
            src: '/default_location.jpeg',
          };
          for (let i = 0; i < images.length; i++) {
            //case insensitive
            if (
              images[i].name.toLowerCase().includes(location.city.toLowerCase())
            ) {
              image = images[i];
              break;
            }
          }
          console.log(location);
          return (
            <Card
              key={post.id}
              id={post._id}
              city={city}
              username={userInfo.username}
              country={country}
              title={post.title}
              count={location.trips.length}
              image_link={image.src}
              explore={false}
              overall_rating={location.avg_overall_rating}
              affordability_rating={location.avg_affordability_rating}
            />
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold text-gray-500">
            No trips found
          </h1>

          <p className="text-gray-500">You do not have any saved trips</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => setTab('Explore')}
          >
            Explore
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
