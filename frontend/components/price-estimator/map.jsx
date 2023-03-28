import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

const Map = ({  }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(undefined);
  const lng = -77;
  const lat = 39;
  const zoom = 3;
  const markers = [
    { lng: -77.0369, lat: 38.9072, title: 'Washington, DC' },
    { lng: -73.9352, lat: 40.7306, title: 'New York, NY' },
    { lng: -122.4194, lat: 37.7749, title: 'San Francisco, CA' }
  ];

  useEffect(() => {
    if (!mapContainer.current || map !== undefined) return;

    setMap(new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=CqDXCNXAkUrEn4wMkI6B`,
      center: [lng, lat],
      zoom: zoom
    }));
  }, [mapContainer]);

  useEffect(() => {
    if (map === undefined) return;

    map.on('style.load', function () {
      // Add your code to add layers, markers, etc. here
      map.addSource('markers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers.map((marker) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker.lng, marker.lat]
            },
            properties: {
              title: marker.title
            }
          }))
        }
      });

      map.addLayer({
        id: 'markers',
        type: 'symbol',
        source: 'markers',
        //this should display name above the marker 
        layout: {
          'icon-image': 'custom-marker',
          'icon-allow-overlap': true,
          'icon-size': 0.5,
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
    });
  }, [map, lng, lat, zoom, markers]);
  
  return (
    <div class="relative w-full h-full" >
        <div ref={mapContainer}  class=" absolute w-3/4 h-full ">
        </div>
    </div>
  );
}
export default Map;


  

