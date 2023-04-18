import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import * as mapJson from '../../../streets-view.json';
import { useSelector } from 'react-redux';
import PopUpContainer from './popup-container';
import { useState } from 'react';
import { useEffect } from 'react';

const MapContainer = ({ destination, setDestination }) => {
  const { locationInfo, loading } = useSelector((state) => state.geo);

  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 45,
    zoom: 5.5,
  });

  useEffect(() => {
    if (destination) {
      setViewState({
        longitude: destination.longitude,
        latitude: destination.latitude,
        zoom: 5.5,
      });
    }
  }, [destination]);

  return (
    <div className="w-full h-[40vh] sm:h-full">
      <Map
        mapStyle={mapJson}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapLib={maplibregl}
      >
        <NavigationControl position="top-left" />
        <GeolocateControl
          trackUserLocation={true}
          onGeolocate={(geo) =>
            setViewState({
              longitude: geo.coords.longitude,
              latitude: geo.coords.latitude,
              city: 'Current Location',
            })
          }
          onTrackUserLocationEnd={(geo) => console.log('HERE')}
        />

        {!loading &&
          locationInfo[0] &&
          //map through locationInfo object
          //map through  by rows
          Object.keys(locationInfo).map((key, id) => {
            return (
              <PopUpContainer
                key={id}
                longitude={locationInfo[key].longitude}
                latitude={locationInfo[key].latitude}
                city={locationInfo[key].city}
                country={locationInfo[key].country}
                affordability_rating={
                  locationInfo[key].avg_affordability_rating
                }
                overall_rating={locationInfo[key].avg_overall_rating}
                selected={destination.city}
              />
            );
          })}
      </Map>
    </div>
  );
};
export default MapContainer;
