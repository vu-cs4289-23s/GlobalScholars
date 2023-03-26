import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(13.0550);
  const [lat] = useState(47.8095);
  const [zoom] = useState(4);
  const [API_KEY] = useState('CqDXCNXAkUrEn4wMkI6B');

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

  });

  return (
    
    <div class="relative w-full h-full" >
        <div ref={mapContainer}  class=" absolute w-3/4 h-full ">
        </div>
    </div>
    
       
  );
}
