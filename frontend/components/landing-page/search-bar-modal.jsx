import { useState, useEffect } from "react";
import xIcon from "../../assets/x-icon.svg";
import data from "../../../data";
import { useNavigate } from "react-router-dom";

const SearchBarModal = ({ setModal, modal }) => {
  const navigate = useNavigate();
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
  const getRandRangeInclusive = (min, max) => {
    //returns a random number between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value["Program Name"]
        .toLowerCase()
        .includes(searchWord.toLowerCase());
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

  const onClick = (ev) => {
    console.log(`Clicking on ${ev.target.name}`);
    // Navigate to forum page for location / program clicked
    navigate(`/program/${ev.target.name}`);
  };

  const click = (value) => {
    // Navigate to forum page for location / program clicked
    navigate(`/program/${value}`);
  };

  return (
    <div
      id="modal-container"
      className={`one ${
        exitModal && "out"
      } w-screen h-screen  bg-[rgba(255,255,255,0.95)] flex flex-col  fixed  text-slate-600 `}
      onKeyDown={onEscPress}
    >
      <div className="modal-background flex">
        <div
          className="flex mx-8  mb-0 pb-0 h-16 w-screen"
          id="input-container"
        >
          <input
            type="text"
            id="search-input"
            className="h-12 w-[80%] sm:w-[85%] md:w-[88%] lg:w-[92%] flex justify-center  mt-3 bg-white"
            placeholder="Search Programs Here"
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className=" h-16 w-16 flex flex-col items-center justify-center ">
            <img
              src={xIcon}
              alt="x icon"
              className=" h-8 w-8 flex justify-center cursor-pointer"
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
        {filteredData.length !== 0 && (
          <div className="dataResult w-[80%] sm:w-[85%] md:w-[88%] lg:w-[92%]  h-12  -mt-1 pt-0 z-10 mx-8  fixed  ">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem w-full h-full "
                  // href={value["Program Link"]}
                  href={`/program/${value["Program Name"]}`}
                //  onClick={click(value["Program Name"])}
                  target="_blank"
                  key={key}
                >
                  <div
                    className={`w-full h-full flex justify-center items-center bg-${
                      colors[key % colors.length]
                    }-100 cursor-pointer hover:text-black rounded transition linear  hover:-translate-y-1  hover:bg-${
                      colors[key % colors.length]
                    }-500 duration-100  `}
                  >
                    {/* <img
                      src={value["Image Link"]}
                      alt="program image"
                      className="h-12 w-12 rounded-full mr-2"
                    /> */}
                    <p
                      className={`w-full h-full  text-sm md:text-md lg:text-lg font-semibold text-gray-600 mr-2  hover:scale-105 `}
                    >
                      {value["Program Name"]}
                    </p>
                  </div>
                </a>
              );
            })}
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem w-full h-full "
                  // href={value["Program Link"]}
                  href={`/city/${value["City"]}`}
                  //  onClick={click(value["Program Name"])}
                  target="_blank"
                  key={key}
                >
                  <div
                    className={`w-full h-full flex justify-center items-center bg-${
                      colors[key % colors.length]
                    }-100 cursor-pointer hover:text-black rounded transition linear  hover:-translate-y-1  hover:bg-${
                      colors[key % colors.length]
                    }-500 duration-100  `}
                  >
                    {/* <img
                      src={value["Image Link"]}
                      alt="program image"
                      className="h-12 w-12 rounded-full mr-2"
                    /> */}
                    <p
                      className={`w-full h-full  text-sm md:text-md lg:text-lg font-semibold text-gray-600 mr-2  hover:scale-105 `}
                    >
                      {value["City"]}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 justify-between mx-12 pt-6 ">
          {tags.map((tag, i) => (
            <span
              className={`inline-block rounded-full w-[90%] px-3 py-1 text-sm md:text-md lg:text-lg font-semibold bg-${
                colors[i % colors.length]
              }-300 text-gray-700 mr-2 mb-2 cursor-pointer hover:scale-110 ease-linear duration-200`}
              id={i}
              key={i}
              name={tag}
              onClick={onClick}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBarModal;
