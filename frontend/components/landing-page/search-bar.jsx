import { useState } from "react";
import magnifyingGlass from "../../assets/magnifying-glass.svg";
import SearchBarModal from "./search-bar-modal";

const SearchBar = () => {
  const [modal, setModal] = useState(false);

  const onEscPress = (e) => {
    if (e.key === "Escape") {
      console.log("esc pressed");
      setModal(false);
    }
  };

  return (
    <div
      className="w-full flex justify-center border-[2px] border-[rgba(0,0,0,0.5)]  rounded-[0.5rem] h-[2.5rem]"
      onKeyDown={onEscPress}
    >
      <div
        id="fake-search-input"
        className=" w-full bg-white text-[rgba(0,0,0,0.5)]  rounded-[0.5rem] flex flex-row  pl-[1rem] cursor-pointer z-0"
        onClick={() => setModal(true)}
      >
        <img src={magnifyingGlass} alt="magnifying glass" width={20} />
        <div className=" flex justify-center align-middle font-sans text-[1rem] ">
          Search Programs Here
        </div>
      </div>
      {modal ? <SearchBarModal setModal={setModal} modal={modal} /> : null}
    </div>
  );
};

export default SearchBar;
