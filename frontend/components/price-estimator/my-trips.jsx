import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAsyncAction } from '../../redux/user/user-slice';
import Card from './card.jsx';

const MyTrips = ({ setTab }) => {
  const { userInfo, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full">
      {userInfo.saves ? (
        userInfo.saves.map((trip) => (
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
