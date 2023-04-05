import { useState } from "react";
import magnifyingGlass from "../../assets/magnifying-glass.svg";
import SearchBarModal from "./search-bar-modal";

const SearchBar = ({forum}) => {
  const [modal, setModal] = useState(false);
  let forumClass = forum ? "w-full flex justify-center rounded-lg h-[2.5rem]" : "w-full flex justify-end rounded-lg h-[2.5rem]";
  let forumWidth = forum ? "w-[87%]" : "w-1/2";

  return (
    <div className={forumClass}>
      <div
        id="fake-search-input"
        className={`bg-white bg-opacity-90 text-[rgba(0,0,0,0.5)] h-full ${forumWidth} ring-slate-50 ring-2 items-center rounded-lg flex flex-row  pl-[1rem] hover:cursor-pointer z-0`}
        onClick={() => setModal(true)}
      >
        <img src={magnifyingGlass} alt="magnifying glass" width={20} />
        <h1 className="ml-2 font-sans text-sm  sm:text-base">
          Start Exploring
        </h1>
      </div>
      {modal ? <SearchBarModal setModal={setModal} modal={modal} /> : null}
    </div>
  );
};

export default SearchBar;
