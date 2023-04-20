import React, { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';

const AffordabilityInfoIcon = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative inline-block">
      <BsInfoCircleFill
        className="text-blue-500 hover:text-blue-800 cursor-pointer"
        size={15}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      />
      {showPopup && (
        <div className="absolute z-10 top-0 left-full ml-2 mt-1 p-2 bg-white border rounded shadow-md text-xs w-32 h-28 text-middle">
          <span className="text-[rgb(11,155,29)]">$</span>
          <p>$0-$500</p>
          <span className="text-[rgb(11,155,29)]">$$</span>
          <p>$500-$1000</p>
          <span className="text-[rgb(11,155,29)]">$$$</span>
          <p>$1000+</p>
        </div>
      )}
    </div>
  );
};

export default AffordabilityInfoIcon;
