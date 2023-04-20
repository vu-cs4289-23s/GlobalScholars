import React from 'react';

const Comment = ({ key, content, username, user_avatar, timestamp, likes, saves, dislikes }) => {

  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      className="flex w-full overflow-visible flex-row sm:h-auto justify-center items-center sm:w-auto h-50 "
      id="background"
      key={key}
    >
      <div
        className="flex flex-row sm:mx-20 mx-4 w-[89%] h-[10vh] m-4 bg-white  justify-center items-center rounded-md shadow-lg shadow-gray-700"
        id="reviews container"
      >
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div
              className="flex flex-col w-[95%] h-[70%] text-left rounded relative top-2"
              id="reviews content"
            >
              <div className="flex flex-col w-full h-full items-start bg-gray-200 justify-start">
                <p className="flex p-4 text-sm sm:text-base">{content}</p>
              </div>
              <div className="flex flex-wrap w-full">
              </div>
            </div>
            <div className="flex flex-row w-[90%] h-auto text-left  rounded relative top-2">
            </div>
          </div>
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Comment;