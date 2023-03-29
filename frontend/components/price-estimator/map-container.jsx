import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Layer,
  Source,
  Popup,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import * as mapJson from "../../../streets-view.json";

const MapContainer = () => {
  //for countries in europe and uk
  const markers = [
    { lng: -0.118092, lat: 51.509865, title: "London, UK" }, // London, UK
    { lng: 2.352222, lat: 48.856614, title: "Paris, France" }, // Paris, France
    { lng: 4.835659, lat: 45.764043, title: "Lyon, France" }, // Lyon, France
  ];
  const [showPopUps, setShowPopUps] = useState(
    Array(markers.length).fill(false)
  );

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "symbol", coordinates: [-122.4, 37.8] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "symbol",
    layout: {
      "icon-image": "map-pin",
      "icon-size": 0.5,
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
    paint: {
      "icon-color": "#007cbf",
      "symbol-placement": "point",
      "symbol-raadius": 10,
    },
  };
  console.log;

  return (
    <div className=" w-full h-full">
      {/* <div ref={mapContainer} className=" absolute w-3/4 h-full "></div> */}
      <Map
        mapStyle={mapJson}
        initialViewState={{
          //eurpe coordinates
          latitude: 50.526,
          longitude: 32.2551,
          zoom: 3,
        }}
        style={{ width: "100%", height: " 100%" }}
        mapLib={maplibregl}
      >
        <NavigationControl position="top-left" />
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source> */}

        {markers.map((marker, index) => {
          return (
            <div
              onMouseOver={() => {
                const newPopups = [...showPopUps];
                if (newPopups[index] === false) {
                  newPopups[index] = true;
                  setShowPopUps(newPopups);
                }
              }}
              onMouseLeave={() => {
                const newPopups = [...showPopUps];
                if (newPopups[index] === true) {
                  newPopups[index] = false;
                  setShowPopUps(newPopups);
                }
              }}
            >
              <Marker
                key={marker.title}
                longitude={marker.lng}
                latitude={marker.lat}
                anchor="bottom"
              >
                <FaMapMarkerAlt className="text-2xl text-red-500 hover:scale-110 transition ease-in-out duration-[100]" />
              </Marker>
              {showPopUps[index] && (
                <Popup
                  longitude={marker.lng}
                  latitude={marker.lat}
                  anchor="top-left"
                  className="bg-white"
                  closeButton={false}
                >
                  {marker.title}
                </Popup>
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
};
export default MapContainer;
