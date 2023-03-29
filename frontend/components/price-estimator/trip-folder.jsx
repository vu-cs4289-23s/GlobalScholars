// import React, { useState } from 'react';
// import Card from './trip-card';

// const TabbedFolder = () => {
//   const [activeTab, setActiveTab] = useState('myTrips');

//   const handleTabClick = (tab) => {
//     console.log('clicked')
//     setActiveTab(tab);
//   };

//   return (
//     <div className="flex flex-col justify-items-center h-full w-1/2 mx-auto">
//       <div className="flex border-b border-gray-300">
//         <button
//           className={`py-2 px-4 ${
//             activeTab === 'myTrips'
//               ? 'bg-blue-200 font-semibold'
//               : 'bg-gray-200'
//           }`}
//           onClick={() => handleTabClick('myTrips')}
//         >
//           My Trips
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === 'explore'
//               ? 'bg-green-200 font-semibold'
//               : 'bg-gray-200'
//           }`}
//           onClick={() => handleTabClick('explore')}
//         >
//           Explore
//         </button>
//       </div>
//       <div className="flex-grow">
//         {activeTab === 'myTrips' ? (
//           <div className="bg-blue-200 h-full p-4 mb-2 font-bold text-4xl">
//             My Saved Trips
//             <div className="mt-6">
//               <Card/>
//             </div>
            
//             </div>
//         ) : (
//           <div className="bg-green-200 h-full p-4 font-bold text-4xl">
//             Explore New Trips
//             <div className="mt-6">
//               <Card/>
//             </div>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TabbedFolder;

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
            <div className="mt-6">
              {card}
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
  card: PropTypes.element.isRequired,
};

export default TabbedFolder;

