import { Popup, Marker } from "react-map-gl";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PopUpContainer = ({ longitude, latitude, city, country }) => {
  const [showPopUps, setShowPopUps] = useState(false);
  const GetRandomPrice = () => {
    const min = 100;
    const max = 10000;
    const randomPrice = Math.floor(Math.random() * (max - min + 1) + min);
    return randomPrice;
  };
  return (
    <div>
      <div onMouseOver={() => setShowPopUps(true)}>
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <FaMapMarkerAlt className="text-lg text-red-500 hover:scale-110 transition ease-in-out duration-[100]" />
        </Marker>
      </div>
      {showPopUps && (
        <Popup
          longitude={longitude}
          latitude={latitude}
          anchor="bottom"
          className="w-52 h-24 pb-[9px]"
          onClose={() => setShowPopUps(false)}
          closeOnMove={true}
        >
          <div className=" mx-2">
            <p>
              {city}, {country}
            </p>
            <p>${GetRandomPrice()}</p>
          </div>
        </Popup>
      )}
    </div>
  );
};
export default PopUpContainer;