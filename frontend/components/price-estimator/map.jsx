import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

const Map = ({}) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(undefined);
  const [startCoords, setStartCoords] = useState(0);
  const [endCoords, setEndCoords] = useState(0);
  const [currentStep, setCurrentStep] = useState('start');

  const apiKey =
    'AAPK6229d644c89544cba402e86637bb9595kTmU3UFoxdXs2msBpw4iN_-tEw7zJIQdiO8ANJ4CzAUVu7hRLDUOBRZjAwqKY0nG';

  const basemapEnum = 'ArcGIS:Navigation';
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
      center: [-79.3832, 43.6532],
      zoom: 12,
    });

    map.on('load', () => {
      addCircleLayers();
      addRouteLayer();
      setMap(map);
    });
  }, []);

  function addCircleLayers() {
    map.addSource('start', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addSource('end', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    map.addLayer({
      id: 'start-circle',
      type: 'circle',
      source: 'start',
      paint: {
        'circle-radius': 6,
        'circle-color': 'white',
        'circle-stroke-color': 'black',
        'circle-stroke-width': 2,
      },
    });

    map.addLayer({
      id: 'end-circle',
      type: 'circle',
      source: 'end',
      paint: {
        'circle-radius': 7,
        'circle-color': 'black',
      },
    });
  }

  function addRouteLayer() {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',

      paint: {
        'line-color': 'hsl(205, 100%, 50%)',
        'line-width': 4,
        'line-opacity': 0.6,
      },
    });
  }

  function updateRoute() {
    const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);

    arcgisRest
      .solveRoute({
        stops: [startCoords, endCoords],
        endpoint:
          'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve',
        authentication,
      })

      .then((response) => {
        map.getSource('route').setData(response.routes.geoJson);

        const directionsHTML = response.directions[0].features
          .map((f) => f.attributes.text)
          .join('<br/>');
        document.getElementById('directions').innerHTML = directionsHTML;
      })

      .catch((error) => {
        console.error(error);
        alert(
          'There was a problem using the route service. See the console for details.'
        );
      });
  }

  const OnClick = (e) => {
    console.log(e);
    const coordinates = e.lngLat.toArray();
    const point = {
      type: 'Point',
      coordinates,
    };

    if (currentStep === 'start') {
      map.getSource('start').setData(point);
      setStartCoords(coordinates);
      const empty = {
        type: 'FeatureCollection',
        features: [],
      };
      map.getSource('end').setData(empty);
      map.getSource('route').setData(empty);
      setEndCoords(null);

      setCurrentStep('end');
    } else {
      map.getSource('end').setData(point);
      setEndCoords(coordinates);

      setCurrentStep('start');
    }

    if (startCoords && endCoords) {
      updateRoute(startCoords, endCoords);
    }
  };

  return (
    <div class="relative w-full h-full">
      <div
        ref={mapContainer}
        class=" absolute w-3/4 h-full"
        onClick={OnClick}
      ></div>
    </div>
  );
};
export default Map;
