const Reviews = ({
  key,
  id,
  username,
  program,
  location,
  content,
  likes,
  saves,
  tags,
  dislikes,
  comments,
}) => {
  return (
    <div
      className="flex w-full overflow-visible flex-row sm:h-auto justify-center h-72 "
      id="background"
    >
      <div
        className="flex flex-row w-[80vw] h-[30vh] m-4 bg-blue-700  justify-center items-center rounded-md"
        id="container"
      >
        <div
          className="flex flex-1 flex-col w-64 h-64 items-center justify-center m-4"
          id="image container"
        >
          <img
            src="https://www.nationsonline.org/gallery/France/View-of-Versailles.jpg"
            alt="avatar"
            className=" w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full  "
          />
          <p className="font-bold mt-4 text-center">
            {location}, {program}
          </p>
        </div>
        <div
          className="flex flex-row bg-gray-200 w-[80%] h-[90%] rounded-md m-4"
          id="reviews container"
        >
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div className="flex flex-row w-[90%] h-[70%] text-left  bg-green-500 rounded relative top-2">
              <p className=" p-4">{content}</p>
            </div>
            <div className="flex flex-row w-[90%] h-auto text-left  rounded relative top-2">
              <textarea
                placeholder="Leave a comment"
                className=" h-[50%] w-full flex justify-start relative top-4 rounded-md focus:scale-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:ease-linear transition-all duration-300 ease-in-out "
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
