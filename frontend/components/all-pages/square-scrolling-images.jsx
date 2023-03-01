import React from 'react';


const ScrollingImagesSquare = ({images}) => {

    //params: images is the array to be passed in (with src photo and name)
    //        shape is the shape in which the photo will be displayed (rounded or square)
return (
    <div style={{ display: 'flex' }}>
      {images.map((image) => (
        
          <div className="scroll-snap-align-start h-64 w-64">
            <img 
                src={image.src} 
                alt={image.name} 
                className="h-52 w-52 object-cover border-4 border-white inline-block mx-3 transform transition hover:scale-125 hover:outline"
                />
            <p className="text-base font-bold p-6 text-gray-900">
            {image.name}
            </p>
         </div>
        
      ))}
    </div>
  );

}

export default ScrollingImagesSquare;