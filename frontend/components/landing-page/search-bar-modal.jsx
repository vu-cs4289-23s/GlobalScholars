import { useState, useEffect } from "react";
import xIcon from "../../assets/x-icon.svg";
import data from "../../../data";

const SearchBarModal = ({ setModal, modal }) => {
  const [wordEntered, setWordEntered] = useState("");
  const [exitModal, setExitModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const colors = ["blue", "amber", "pink", "rose", "indigo", "pink"];
  const tags = [
    "Travel",
    "Academic",
    "Sights",
    "Social",
    "Foods",
    "Location",
    "Language",
    "Culture",
    "Housing",
    "Cost",
    "Weather",
    "Safety",
    "Reviews",
    "Other",
  ];

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const onEscPress = (e) => {
    if (e.key === "Escape") {
      console.log("esc pressed");
      if (wordEntered === "") {
        setExitModal(true);
      } else {
        clearInput();
      }
    }
  };
  useEffect(() => {
    if (exitModal) {
      console.log("SETTING TIMEOUT");
      setTimeout(() => {
        setModal(false);
        setExitModal(false);
      }, 800);
    }
  }, [exitModal]);
  useEffect(() => {
    document.getElementById("search-input").focus();
  }, []);

  return (
    <div
      id="modal-container"
      className={`one ${
        exitModal && "out"
      } w-screen h-screen  bg-[rgba(255,255,255,0.95)] flex flex-col  overflow-x-hidden overflow-y-auto fixed z-50 text-slate-600 `}
      onKeyDown={onEscPress}
    >
      <div className="modal-background">
        <div>
          <div className="flex mx-4">
            <input
              type="text"
              id="search-input"
              className="h-12 w-[90vw] mt-4  bg-white"
              placeholder="Search Programs Here"
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              <img
                src={xIcon}
                alt="x icon"
                className=" top-0 right-0 m-4 h-12 cursor-pointer"
                width={20}
                onClick={() => {
                  if (wordEntered === "") {
                    setExitModal(true);
                  } else {
                    clearInput();
                  }
                }}
              />
            </div>
          </div>
          {filteredData.length != 0 && (
            <div>
              <div className="dataResult w-[90vw] absolute z-10 mx-4  bg-transparent">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <a
                      className="dataItem w-full h-full bg-slate-400"
                      href={value.link}
                      target="_blank"
                      key={key}
                    >
                      <p
                        className={`bg-${
                          colors[key % colors.length]
                        }-100 w-full h-full`}
                      >
                        {value.title}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 justify-center mx-12 ">
          {tags.map((tag, i) => (
            <div className="bg-${color[0]}-500 w-24" key={i}>
              <span
                className={`inline-block rounded-full w-24 px-3 py-1 text-sm font-semibold bg-${
                  colors[i % colors.length]
                }-300 text-gray-700 mr-2 mb-2 cursor-pointer`}
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
