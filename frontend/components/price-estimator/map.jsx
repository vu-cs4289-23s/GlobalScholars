import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

const Map = ({  }) => {
  const mapContainer = useRef(null);
  let map = undefined;
  const lng = 12;
  const lat = 88;
  const zoom = 3;
  const markers = [
    { lng: -77.0369, lat: 38.9072 }, // Washington, DC
    { lng: -73.9352, lat: 40.7306 }, // New York, NY
    { lng: -122.4194, lat: 37.7749 } // San Francisco, CA
  ];
  useEffect(() => {
    if (!map) return;

    // add markers to the map
  markers.forEach(marker => {
    const el = document.createElement('div');
    el.className = 'marker';
    new maplibregl.Marker(el)
      .setLngLat([marker.lng, marker.lat])
      .addTo(map);
  });
  }, [map])

  useEffect(() => {
    if (!mapContainer.current) return;

    map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=CqDXCNXAkUrEn4wMkI6B`,
      center: [lng, lat],
      zoom: zoom
    });

    map.on('style.load', function () {
      // Add your code to add layers, markers, etc. here
      map.addSource('markers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers
        }
      });

      map.addLayer({
        id: 'markers',
        type: 'symbol',
        source: 'markers',
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
  }, [mapContainer, lng, lat, zoom, markers]);
  
  return (
    <div class="relative w-full h-full" >
        <div ref={mapContainer}  class=" absolute w-3/4 h-full ">
        </div>
    </div>
  );
}
export default Map;


  

