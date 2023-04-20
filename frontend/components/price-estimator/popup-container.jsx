import { Popup, Marker } from 'react-map-gl';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PopUpContainer = ({
  longitude,
  latitude,
  city,
  country,
  overall_rating,
  affordability_rating,
  selected,
  setDestination,
}) => {
  const [showPopUps, setShowPopUps] = useState(false);

  return (
    <div
      onMouseOver={() => setShowPopUps(true)}
      onMouseLeave={() => setShowPopUps(false)}
    >
      <div>
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <FaMapMarkerAlt
            className={`text-xl cursor-auto ${
              selected === city &&
              'animate-bounce text-4xl duration-500 ease-in-out '
            }`}
            style={{ fill: 'red' }}
            onClick={() => setDestination({ country, longitude, latitude })}
          />
        </Marker>
      </div>
      {showPopUps && (
        <Popup
          longitude={longitude}
          latitude={latitude}
          anchor="bottom"
          className="w-52 h-24 pb-[9px]"
          closeOnMove={true}
          closeButton={false}
        >
          <div className=" mx-2">
            <p>
              {city}, {country}
            </p>
            <p>Affordability: {affordability_rating.toFixed(2)}</p>
            <p>Overall: {overall_rating.toFixed(2)}</p>
          </div>
        </Popup>
      )}
    </div>
  );
};
export default PopUpContainer;
