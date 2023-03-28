import React, { useState } from 'react';
import Card from './trip-card';

const TabbedFolder = () => {
  const [activeTab, setActiveTab] = useState('myTrips');

  const handleTabClick = (tab) => {
    console.log('clicked')
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col justify-items-center h-full w-2/3 mx-auto">
      <div className="flex border-b border-gray-300">
        <button
          className={`py-2 px-4 ${
            activeTab === 'myTrips'
              ? 'bg-blue-200 font-semibold'
              : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('myTrips')}
        >
          My Trips
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'explore'
              ? 'bg-green-200 font-semibold'
              : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('explore')}
        >
          Explore
        </button>
      </div>
      <div className="flex-grow">
        {activeTab === 'myTrips' ? (
          <div className="bg-blue-200 h-full p-4 mb-2 font-bold text-4xl">
            My Saved Trips
            <Card/>
            
            </div>
        ) : (
          <div className="bg-green-200 h-full p-4 mb-2 font-bold text-4xl">
            Explore New Trips
            <Card/>
            </div>
        )}
      </div>
    </div>
  );
};

export default TabbedFolder;
