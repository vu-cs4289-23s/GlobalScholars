const Reviews = ({ id }) => {
  return (
    <div className="flex flex-row  justify-center " id="background">
      <div
        className="flex flex-row w-[80vw] h-[30vh] bg-blue-700  justify-center items-center rounded-md"
        id="container"
      >
        <div
          className="flex flex-1 flex-col w-64 h-64 items-center justify-center mr-0 pr-0"
          id="image container"
        >
          <img
            src="https://www.nationsonline.org/gallery/France/View-of-Versailles.jpg"
            alt="avatar"
            className=" w-12 h-12 sm:w-24 sm:h-24 lg:w-48 lg:h-48 rounded-full  "
          />
          <p>France</p>
        </div>
        <div
          className="flex flex-row bg-gray-200 w-[80%] h-[90%] rounded-md m-4"
          id="reviews container"
        >
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div className="flex flex-row w-[90%] h-[70%] text-left  bg-green-500 rounded relative top-2">
              <p className=" p-4">Last night was a moooooooooooooooovie </p>
            </div>
            <div className="flex flex-row w-[90%] h-auto text-left  rounded relative top-2">
              <input
                type="text"
                placeholder="Leave a comment!"
                className=" h-[15%] w-full flex justify-start relative top-4 rounded-md"
              />
              <p>Thumbs up</p>
              <p>Thumbs down</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
