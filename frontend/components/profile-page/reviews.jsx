import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import Tag from "../forum/all-forums/tag";
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
  date,
  type,
  comments,
}) => {
  const colorScheme = ["blue", "amber", "pink", "rose", "indigo", "pink"];
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [save, setSave] = useState(false);
  const [comment, setComment] = useState("");
  return (
    <div
      className="flex w-full overflow-visible flex-row sm:h-auto justify-center items-center sm:w-auto h-72 "
      id="background"
      key={key}
    >
      <div
        className="flex flex-row w-[90%] h-[30vh] m-4 bg-white  justify-center items-center rounded-md shadow-lg shadow-gray-700"
        id="container"
      >
        <div
          className="flex flex-1 flex-col w-64 h-full items-center justify-center   m-4"
          id="image container"
        >
          <img
            src="https://www.nationsonline.org/gallery/France/View-of-Versailles.jpg"
            alt="avatar"
            className={`flex w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24  ${
              type === "review" ? "rounded-md" : "rounded-full"
            } object-cover shadow-lg shadow-black `}
          />
          {type === "review" ? (
            <p className=" mt-4 text-center">{location}</p>
          ) : (
            <div className="flex flex-col">
              <p className=" mt-4 text-left text-xs">{username}</p>
              <p className=" mt-4 text-left text-xs">{program}</p>
              <p className=" mt-4 text-left text-xs">{date}</p>
            </div>
          )}
        </div>
        <div
          className="flex flex-row w-[80%] h-[90%] rounded-md m-4"
          id="reviews container"
        >
          <div className="flex flex-col w-full h-full items-center justify-start">
            <div
              className="flex flex-col w-[90%] h-[70%] text-left bg-gray-200 rounded relative top-2"
              id="reviews content"
            >
              <div className="flex flex-col w-full h-full items-start justify-start">
                <p className="flex p-4 text-sm sm:text-base">{content}</p>
              </div>
              <div className="flex flex-wrap w-full">
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, key) => (
                    <div key={key} className="flex mx-1">
                      <Tag
                        content={tag}
                        color={
                          "bg-" + colorScheme[key % colorScheme.length] + "-300"
                        }
                        onClick={() => console.log("clicked")}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-row w-[90%] h-auto text-left  rounded relative top-2">
              <form className="flex w-full">
                <textarea
                  placeholder="Leave a comment"
                  className=" h-[50%] w-full flex justify-start relative top-4 rounded-md focus:scale-[102%] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:ease-linear transition-all duration-300 ease-in-out "
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                {comment.length > 0 ? (
                  <button
                    className="flex justify-center items-center h-10 w-10 rounded-full bg-blue-600 text-white relative  left-0 top-0 mx-2 mt-2"
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                ) : (
                  <div
                    className="flex justify-center items-center px-2"
                    id="icons"
                  >
                    <FaThumbsUp height={80} width={80} className="h-6 w-6" />
                    <FaThumbsDown
                      height={80}
                      width={80}
                      className="h-6 w-6 ml-2"
                    />
                    <BsBookmark
                      height={80}
                      width={80}
                      className="h-6 w-6 ml-2"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
