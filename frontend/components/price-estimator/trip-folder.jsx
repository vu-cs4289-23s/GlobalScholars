import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './trip-card';

const TabbedFolder = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="flex flex-col justify-items-center h-full w-1/2 mx-auto">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`py-2 px-4 ${
              activeTab === tab.title
                ? 'bg-blue-200 font-semibold'
                : 'bg-gray-200'
            }`}
            onClick={() => handleTabClick(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="flex-grow">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={`${
              activeTab === tab.title ? '' : 'hidden'
            } bg-green-200 h-full p-4 font-bold text-4xl`}
          >
            <div className="mt-6">
              <Card />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TabbedFolder.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TabbedFolder;
