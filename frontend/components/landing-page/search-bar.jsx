import { useState } from "react";
import magnifyingGlass from "../../assets/magnifying-glass.svg";
import SearchBarModal from "./search-bar-modal";

const SearchBar = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full flex justify-end rounded-lg h-[2.5rem]">
      <div
        id="fake-search-input"
        className="  bg-white bg-opacity-90 text-[rgba(0,0,0,0.5)] h-full w-1/2 ring-slate-50 ring-2 items-center rounded-lg flex flex-row  pl-[1rem] hover:cursor-pointer z-0"
        onClick={() => setModal(true)}
      >
        <img src={magnifyingGlass} alt="magnifying glass" width={20} />
        <h1 className="ml-2 font-sans text-sm  sm:text-base">
<<<<<<< HEAD
          Search
=======
          Start Exploring
>>>>>>> dfb20ba8fe94ab12b38744089a0aed77b1c976d1
        </h1>
      </div>
      {modal ? <SearchBarModal setModal={setModal} modal={modal} /> : null}
    </div>
  );
};

export default SearchBar;
