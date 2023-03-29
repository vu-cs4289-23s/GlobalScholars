import "mapbox-gl/dist/mapbox-gl.css";
import Map, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import * as mapJson from "../../../streets-view.json";
import { useSelector } from "react-redux";
import PopUpContainer from "./popup-container";

const MapContainer = () => {
  const { locationInfo, loading } = useSelector((state) => state.geo);

  //for countries in europe and uk
  const markers = [
    { lng: -0.118092, lat: 51.509865, title: "London, UK" }, // London, UK
    { lng: 2.352222, lat: 48.856614, title: "Paris, France" }, // Paris, France
    { lng: 4.835659, lat: 45.764043, title: "Lyon, France" }, // Lyon, France
  ];
  //create an array of false values to the size of locationInfo object after  loading is false
  const locationInfoSize = Object.keys(locationInfo).length;
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "symbol", coordinates: [-122.4, 37.8] },
      },
    ],
  };

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

        {locationInfo[0] &&
          //map through locationInfo object
          //map through  by rows
          Object.keys(locationInfo).map((key, id) => {
            return (
              <PopUpContainer
                longitude={locationInfo[key].longitude}
                latitude={locationInfo[key].latitude}
                city={locationInfo[key].city}
                country={locationInfo[key].country}
              />
            );
          })}
      </Map>
    </div>
  );
};
export default MapContainer;
