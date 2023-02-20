import { useState } from "react";
import magnifyingGlass from "../../assets/magnifying-glass.svg";
import SearchBarModal from "./search-bar-modal";

const SearchBar = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full flex justify-center rounded-lg h-[2.5rem]">
      <div
        id="fake-search-input"
        className=" w-full bg-white text-[rgba(0,0,0,0.5)] h-full ring-slate-50 ring-4 items-center rounded-lg flex flex-row  pl-[1rem] cursor-pointer z-0"
        onClick={() => setModal(true)}
      >
        <img src={magnifyingGlass} alt="magnifying glass" width={20} />
        <h1 className="ml-2 font-sans text-sm  sm:text-base">
          Search Programs Here
        </h1>
      </div>
      {modal ? <SearchBarModal setModal={setModal} modal={modal} /> : null}
    </div>
  );
};

export default SearchBar;
