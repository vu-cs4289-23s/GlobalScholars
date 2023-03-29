import React from 'react';

const Comment = ({ key, content, username, user_avatar, timestamp, likes, saves, dislikes }) => {

  return (
    <div
      className="flex w-full overflow-visible flex-row sm:h-auto justify-center items-center sm:w-auto h-50 "
      id="background"
      key={key}
    >
      <div
        className="flex flex-row w-[90%] h-[10vh] m-4 bg-white  justify-center items-center rounded-md shadow-lg shadow-gray-700"
        id="reviews container"
      >
        {/*<div*/}
        {/*  className="flex flex-row w-[100%] h-[90%] rounded-md m-4 "*/}
        {/*  id="reviews container"*/}
        {/*>*/}
        {/*  <div className="flex flex-col">*/}
        {/*    <p className=" mt-4 text-left text-xs">{username}</p>*/}
        {/*    <p className=" mt-4 text-left text-xs">{timestamp}</p>*/}
        {/*  </div>*/}
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div
              className="flex flex-col w-[90%] h-[70%] text-left bg-gray-200 rounded relative top-2"
              id="reviews content"
            >
                  {/*<p className=" mt-4 text-left text-xs">{username}</p>*/}
                  {/*<p className=" mt-4 text-left text-xs">{timestamp}</p>*/}
              <div className="flex flex-col w-full h-full items-start justify-start">
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