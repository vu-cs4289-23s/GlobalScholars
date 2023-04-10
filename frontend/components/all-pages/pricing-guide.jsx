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
        <div className="absolute z-10 top-0 left-full ml-2 mt-1 p-2 bg-white border rounded shadow-md">
          <p className="text-sm">
            $: $100-$250<br />
            $$: $250-$400<br />
            $$$: $400+
          </p>
        </div>
      )}
    </div>
  );
};

export default AffordabilityInfoIcon;
