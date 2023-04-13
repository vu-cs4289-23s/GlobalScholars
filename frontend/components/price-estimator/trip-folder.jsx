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
  console.log(tabs);

  return (
    <div className="folder">
      <div className="top flex">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={`px-4 ${
              activeTab === tab.title
                ? 'bg-sky-200 font-semibold'
                : 'bg-sky-100'
            }`}
            onClick={() => handleTabClick(tab.title)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {/* {/* <div class="front">gello</div> */}
      <div className="back">
        {activeTab === 'Explore' ? (
          <Explore />
        ) : (
          <MyTrips setTab={setActiveTab} />
        )}
      </div>
    </div>
    // <div className="flex flex-col h-full w-full mx-auto">
    //   <div className="flex bg-sky-200  z-0">
    //     {tabs.map((tab) => (
    //       <div
    //         key={tab.title}
    //         className={` px-4 cursor-pointer rounded-md ${
    //           activeTab === tab.title
    //             ? 'bg-sky-200 font-semibold'
    //             : 'bg-sky-100'
    //         }`}
    //         onClick={() => handleTabClick(tab.title)}
    //       >
    //         {tab.title}
    //       </div>
    //     ))}
    //     <div class=" border-sky-200 -z-10  w-full transform rotate-[210deg] origin-bottom-right" />
    //   </div>

    //   <div
    //     className={` bg-sky-300 h-full p-4 font-bold text-4xl flex flex-row justify-center z-20 shadow-2xl `}
    //   >
    //     <div className="justify-center align-middle ">
    //       adding box shadow like apple folder
    //       <div className="bg-sky-300 h-20 w-20 shadow-2xl"></div>
    //     </div>
    //     {activeTab === 'Explore' ? (
    //       <Explore />
    //     ) : (
    //       <MyTrips setTab={setActiveTab} />
    //     )}
    //   </div>
    // </div>
  );
};

export default TabbedFolder;
