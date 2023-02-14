import { useRef } from "react";
import { Form } from "react-router-dom";
import xIcon from "../../assets/x-icon.svg";

const SearchBarModal = ({ setModal, modal }) => {
  const search = useRef("");
  const colors = ["blue", "amber", "pink", "rose", "indigo", "pink"];
  const tags = [
    "Travel",
    "Academic",
    "Sight Seeing",
    "Social Scene",
    "Foods",
    "Location",
  ];
  return (
    <div
      id="modal-container"
      className="one w-screen h-screen  bg-[rgba(255,255,255,0.95)] flex flex-col  overflow-x-hidden overflow-y-auto fixed z-50 text-slate-600 "
    >
      <div className="modal-background">
        <div className="flex ">
          <input
            type="text"
            className="h-12  w-[80vw] m-4 bg-white"
            placeholder="Search Programs Here"
            ref={search}
          />
          <img
            src={xIcon}
            alt="x icon"
            className=" top-0 right-0 m-4 h-12 cursor-pointer"
            width={20}
            onClick={() => setModal(!modal)}
          />
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          <h1>Tags</h1>
        </div>

        <div className="flex flex-row ">
          {tags.map((tag, i) => (
            <div className="bg-${color[0]}-500" key={i}>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold bg-${
                  colors[i % colors.length]
                }-300 text-gray-700 mr-2 mb-2`}
                id={i}
              >
                #{tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBarModal;
