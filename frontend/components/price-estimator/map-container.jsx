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

const MapContainer = ({ from, to, setFrom }) => {
  const { locationInfo, loading } = useSelector((state) => state.geo);

  //for countries in europe and uk
  const markers = [
    { lng: -0.118092, lat: 51.509865, title: 'London, UK' }, // London, UK
    { lng: 2.352222, lat: 48.856614, title: 'Paris, France' }, // Paris, France
    { lng: 4.835659, lat: 45.764043, title: 'Lyon, France' }, // Lyon, France
  ];
  //create an array of false values to the size of locationInfo object after  loading is false
  const locationInfoSize = Object.keys(locationInfo).length;
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [from.longitude, from.latitude],

            [to.longitude, to.latitude],
          ],
        },
      },
    ],
  };
  const layerStyle = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#888',
      'line-width': 3,
    },
  };

  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 45,
    zoom: 3,
  });

  const CalculateMidPoint = (x1, y1, x2, y2) => {
    return {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };
  };

  const CaclculateZoomBasedOnDistance = (x1, y1, x2, y2) => {
    // zoom out more for long distances
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    console.log(distance);
    if (distance > 200) {
      return 1;
    } else if (distance > 150) {
      return 1.25;
    } else if (distance > 100) {
      return 1.75;
    } else if (distance > 50) {
      return 2.25;
    } else if (distance > 20) {
      return 3;
    } else if (distance > 10) {
      return 4;
    } else {
      return 6;
    }
  };
  useEffect(() => {
    if (from && to) {
      const midPoint = CalculateMidPoint(
        from.longitude,
        from.latitude,
        to.longitude,
        to.latitude
      );
      setViewState({
        longitude: midPoint.x,
        latitude: midPoint.y,
        zoom: CaclculateZoomBasedOnDistance(
          from.longitude,
          from.latitude,
          to.longitude,
          to.latitude
        ),
      });
    }
  }, [from, to]);

  return (
    <div className="w-full h-full p-4">
      {/* <div ref={mapContainer} className=" absolute w-3/4 h-full "></div> */}
      <Map
        mapStyle={mapJson}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapLib={maplibregl}
      >
        <NavigationControl position="top-left" />
        <GeolocateControl
          onGeolocate={(geo) =>
            setFrom({
              longitude: geo.coords.longitude,
              latitude: geo.coords.latitude,
              city: 'Current Location',
            })
          }
          onTrackUserLocationEnd={(geo) => console.log('HERE')}
        />

        {from && to && (
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        )}

        {locationInfo[0] &&
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
              />
            );
          })}
      </Map>
    </div>
  );
};
export default MapContainer;
