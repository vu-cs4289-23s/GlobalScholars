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
      className="w-full flex justify-center items-center border-[1px] border-[rgba(0,0,0,0.5)]  rounded-[0.5rem] h-[2.5rem]"
      onKeyDown={onEscPress}
    >
      <div
        id="fake-search-input"
        className=" w-full bg-white text-left font-sans text-[1rem] text-[rgba(0,0,0,0.5)]  rounded-[0.5rem] flex items-center pl-[1rem] cursor-text z-0"
        onClick={() => setModal(true)}
      >
        Search Programs Here
        <img
          src={magnifyingGlass}
          alt="magnifying glass"
          className="ml-2"
          width={20}
        />
      </div>
      {modal ? <SearchBarModal setModal={setModal} modal={modal} /> : null}
    </div>
  );
};

export default SearchBar;
