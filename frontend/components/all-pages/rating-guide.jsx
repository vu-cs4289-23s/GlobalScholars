import React, { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';

const RatingInfoIcon = () => {
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
        <div className="absolute z-10 top-0 left-full ml-2 mt-1 p-2 bg-white border rounded shadow-md">
          <p className="text-sm">
            1: Awful <br />
            5: Awesome
          </p>
        </div>
      )}
    </div>
  );
};

export default RatingInfoIcon;