import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocationByNameAsyncAction, getProgramByIdAsyncAction }  from "../../redux/geo/geo-slice.js";
import { useDispatch, useSelector } from "react-redux";

const ScrollingImages = ({images, rounded}) => {
  const [shape, setShape] = useState("h-52 w-52 object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locationInfo, programInfo } = useSelector((state)  => state.geo);
  const [programIds, setProgramIds] = useState([]);

  useEffect(() => {
    if (rounded) {
      setShape("h-52 w-52 rounded-full object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline");
    }
  },[]);

  const onClick = (ev) => {
    console.log(`Clicking on ${ev.target.name}`);
    // Navigate to forum page for location / program clicked
    navigate(`/forum/${ev.target.name.split(",")[0].toLowerCase()}`);
  };

  const onHover =  (ev) => {
    console.log(`Hovering over ${ev.target.name}`)
    if (rounded) {
      // Call  to API to fetch all programs under : ev.target.name.split(",")[0].toLowerCase()
      dispatch(getLocationByNameAsyncAction(ev.target.name.split(",")[0].toLowerCase()))
    }
  }

  useEffect(() => {
    // set programs to the array of program ids associated with the location
    if (locationInfo && locationInfo.length > 0) {
      setProgramIds(locationInfo[0].programs);
    }
  }, [locationInfo]);

  // doesn't work
  useEffect(() => {
    // fetch each program by id to display
    console.log(programIds);

    if (programIds && programIds.length > 0) {
      programIds.map((id) => {
        getProgramByIdAsyncAction(id);
        // console.log(programInfo);
      });
    }
  }, [programIds]);

  useEffect(() => {
    console.log(programInfo);
  }, [programInfo])

    //params: images is the array to be passed in (with src photo and name)
    //        shape is the shape in which the photo will be displayed (rounded or square)
return (
    <div style={{ display: 'flex' }}>
      {images.map((image) => (
        
          <div className="scroll-snap-align-start h-64 w-64">
            <img 
                src={image.src}
                name={image.name}
                alt={image.name} 
                className={shape}
                onClick={onClick}
                onMouseOver={onHover}
                />
            <p className="text-base font-bold p-6 text-gray-900">
            {image.name}
            </p>
         </div>
        
      ))}
    </div>
  );

}

export default ScrollingImages;