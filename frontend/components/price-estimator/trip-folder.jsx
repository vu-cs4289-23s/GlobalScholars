import React, { useState } from 'react';
import Explore from './explore';
import MyTrips from './my-trips';
import { useEffect } from 'react';

const TabbedFolder = ({ tabs, search, handleScrollToTop }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };
  useEffect(() => {
    if (search) {
      setActiveTab('Explore');
    }
  }, [search]);

  return (
    <div className="w-full h-full bg-[#93bad8] flex flex-col items-center rounded-xl">
      <div className="relative flex w-[200px] h-[20px] rounded-t-full bg-[#93bad8] top-[-20px]">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={`px-4 w-[100px] cursor-pointer  ${
              activeTab === tab.title
                ? 'bg-sky-200 font-semibold'
                : 'bg-sky-100'
            } ${
              tab.title === 'Explore' ? 'rounded-tr-full' : 'rounded-tl-full'
            } `}
            onClick={() => handleTabClick(tab.title)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {/* {/* <div class="front">gello</div> */}
      {activeTab === 'Explore' ? (
        <Explore />
      ) : (
        <MyTrips setTab={setActiveTab} />
      )}
    </div>
   
  );
};

export default TabbedFolder;
