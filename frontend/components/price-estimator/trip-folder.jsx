import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TabbedFolder = ({ tabs, card }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="flex flex-col h-full w-3/4 mx-auto">
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
            } bg-sky-200 h-full p-4 font-bold text-4xl`}
          >
            <div className="mt-6">{card}</div>
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
  card: PropTypes.element.isRequired,
};

export default TabbedFolder;
