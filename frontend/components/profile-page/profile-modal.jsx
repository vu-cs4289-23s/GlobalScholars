import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAsyncAction } from "../../redux/user/user-slice";
import { useEffect } from "react";
const ProfileModal = ({ modal, setModal }) => {
  const thingsToAsk = ["graduating year", "major", "minor", "bio"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [year, setYear] = useState(new Date());
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const majorOptions = [
    "African American and Diaspora Studies",
    "American Studies",
    "Anthropology",
    "Architecture and the Built Environment",
    "Art",
    "Asian American and Asian Diaspora Studies",
    "Asian Studies",
    "Biochemistry and Chemical Biology",
    "Biological Sciences",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Chemistry",
    "Child Development",
    "Child Studies",
    "Cinema and Media Arts",
    "Civil Engineering",
    "Classical and Mediterranean Studies",
    "Climate Studies",
    "Cognitive Studies",
    "Communication of Science and Technology",
    "Communication Studies",
    "Computer Science",
    "Earth and Environmental Sciences",
    "Ecology, Evolution, and Organismal Biology",
    "Economics",
    "Economics and History",
    "Electrical and Computer Engineering",
    "Electrical Engineering",
    "Elementary Education",
    "Engineering Science",
    "English",
    "Environmental Sociology",
    "European Studies",
    "European Studies: Russia and Eastern Europe",
    "French",
    "French and European Studies",
    "Gender and Sexuality Studies",
    "German and European Studies",
    "German Studies",
    "History",
    "History of Art",
    "Human and Organizational Development",
    "Italian and European Studies",
    "Jazz Studies",
    "Jewish Studies",
    "Latin American Studies",
    "Latino and Latina Studies",
    "Law, History, and Society",
    "Mathematics",
    "Mechanical Engineering",
    "Medicine, Health, and Society",
    "Molecular and Cellular Biology",
    "Music Composition",
    "Music Education (Blair-to-Peabody)",
    "Music Integrated Studies",
    "Music Performance",
    "Musical Arts",
    "Neuroscience",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Public Policy Studies",
    "Religious Studies",
    "Russian Studies",
    "Secondary Education",
    "Sociology",
    "Spanish",
    "Spanish and European Studies",
    "Spanish and Portuguese",
    "Special Education",
    "Theatre",
    "Other",
  ];
  const minorOptions = [
    "African American and Diaspora Studies",
    "American Studies",
    "Anthropology",
    "Arabic Language",
    "Architecture and the Built Environment",
    "Art",
    "Asian Studies",
    "Astronomy",
    "Biological Sciences",
    "Brazilian Studies",
    "Chemistry",
    "Child Development",
    "Chinese Language and Culture",
    "Cinema and Media Arts",
    "Classical and Mediterranean Studies",
    "Climate Studies",
    "Cognitive Studies",
    "Communication Studies",
    "Communication of Science and Technology",
    "Computer Science",
    "Digital Fabrication",
    "Earth and Environmental Sciences",
    "Economics",
    "Educational Studies",
    "Electrical and Computer Engineering",
    "Elementary Education",
    "Energy and Environmental Systems",
    "Engineering Management",
    "English",
    "Environmental and Sustainability Studies",
    "Environmental Engineering",
    "European Studies",
    "French",
    "Gender and Sexuality Studies",
    "General Music",
    "German Studies",
    "History",
    "History of Art",
    "Human and Organizational Development",
    "Islamic Studies",
    "Italian Studies",
    "Japanese Language and Culture",
    "Jazz",
    "Jewish Studies",
    "Korean Language and Culture",
    "Language Science",
    "Latin American Studies",
    "Latino and Latina Studies",
    "Law, History, and Society",
    "Mathematics",
    "Materials Science",
    "Master of Liberal Arts and Science",
    "Master of Science in Applied Clinical Informatics",
    "Master of Science in Biomedical Engineering",
    "Master of Science in Computer Science",
    "Master of Science in Data Science",
    "Master of Science in Electrical Engineering",
    "Master of Science in Mechanical Engineering",
    "Master of Science in Medical Physics",
    "Master of Science in Physics",
    "Master of Science in Robotics",
    "Mathematical Sciences",
    "Mechanical Engineering",
    "Medicine, Health, and Society",
    "Mediterranean Archaeology",
    "Mediterranean Studies",
    "Music Composition",
    "Music Education (Blair-to-Peabody)",
    "Music Integrated Studies",
    "Music Performance",
    "Musicology",
    "Musical Arts",
    "Nanoscience and Nanotechnology (jointly administered by the College of Arts & Science)",
    "Neuroscience",
    "Philosophy",
    "Physics",
    "Political Science",
    "Portuguese",
    "Psychology",
    "Public Policy Studies",
    "Quantitative Methods",
    "Reading/Literacy Education",
    "Religious Studies",
    "Russian Studies",
    "Scientific Computing (jointly administered by the College of Arts & Science)",
    "Secondary Education",
    "Sociology",
    "South Asian Language and Culture",
    "Spanish",
    "Spanish and European Studies",
    "Spanish and Portuguese",
    "Spanish for the Professions",
    "Special Education",
    "Teaching Linguistically Diverse Students",
    "Theatre",
    "Other",
  ];

  const colors = ["blue", "amber", "pink", "rose", "indigo", "pink"];
  const handleSubmit = () => {
    dispatch(
      updateUserAsyncAction({
        majors,
        minors,
        grad_year: year,
        bio,
      })
    );
  };
  useEffect(() => {
    console.log("MAJORS:", majors);
  }, [majors]);

  return (
    <div className="w-screen h-screen absolute bg-[rgba(0,0,0,.7)]  flex flex-col justify-center items-center">
      <div className="absolute top-60 text-white">{currentQuestion + 1}/ 4</div>
      <div className="w-1/2 h-1/2  bg-brown rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white font-sans font-bold">
          {currentQuestion === 0 && "What year are you graduating?"}
          {currentQuestion === 1 && "What are your majors?"}
          {currentQuestion === 2 && "What are your minors?"}
          {currentQuestion === 3 && "Tell us about yourself!"}
        </h1>
        {currentQuestion === 0 && (
          <input
            type="date"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ex. 2024"
          />
        )}
        {currentQuestion === 1 && (
          <div>
            {majors.length > 0 && (
              <div className="flex flex-wrap justify-center items-center w-[100%]">
                {majors.map((major, i) => (
                  <div className="flex flex-wrap justify-center items-center  w-full">
                    <span
                      className={`inline-block rounded-full w-full px-3 py-1 text-sm md:text-md lg:text-lg font-semibold bg-${
                        colors[i % colors.length]
                      }-300 text-gray-700 mr-2 mb-2 cursor-pointer relative pr-8`}
                      id={i}
                      key={i}
                    >
                      {major}
                      <button
                        className="absolute top-0 right-0 m-1 p-1 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
                        onClick={() =>
                          setMajors(majors.filter((m) => m !== major))
                        }
                      >
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <select
              onChange={(e) =>
                e.target.value !== "" && majors.indexOf(e.target.value) === -1
                  ? setMajors([...majors, e.target.value])
                  : null
              }
            >
              <option value="" key="-1">
                --Choose your majors--
              </option>

              {majorOptions.map((major, i) => (
                <option value={major} key={i}>
                  {major}
                </option>
              ))}
            </select>
          </div>
        )}
        {currentQuestion === 2 && (
          <div>
            {minors.length > 0 && (
              <div className="flex flex-wrap justify-center items-center w-[100%]">
                {minors.map((minor, i) => (
                  <div className="flex flex-wrap justify-center items-center  w-full">
                    <span
                      className={`inline-block rounded-full w-full px-3 py-1 text-sm md:text-md lg:text-lg font-semibold bg-${
                        colors[i % colors.length]
                      }-300 text-gray-700 mr-2 mb-2 cursor-pointer relative pr-8`}
                      id={i}
                      key={i}
                    >
                      {minor}
                      <button
                        className="absolute top-0 right-0 m-1 p-1 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
                        onClick={() =>
                          setMinors(minors.filter((m) => m !== minor))
                        }
                      >
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <select
              onChange={(e) =>
                e.target.value !== "" && minors.indexOf(e.target.value) === -1
                  ? setMinors([...minors, e.target.value])
                  : null
              }
            >
              <option value="" key="-1">
                --Choose your Minors--
              </option>

              {minorOptions.map((minor, i) => (
                <option value={minor} key={i}>
                  {minor}
                </option>
              ))}
            </select>
          </div>
        )}
        {currentQuestion === 3 && (
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        )}
        {/* Next button */}
        <div className="flex flex-row justify-center pt-8">
          <button
            className="bg-white text-black font-bold py-2 mx-2 px-4 rounded"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
          >
            Go Back
          </button>
          <button
            className="bg-white text-black font-bold mx-2 py-2 px-4 rounded"
            onClick={() => {
              if (currentQuestion < 3) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                handleSubmit();
                setModal(false);
              }
            }}
          >
            {currentQuestion === 3 ? "Finish" : "Next"}
          </button>
        </div>
        <div className="flex flex-row justify-center items-center"></div>
      </div>
    </div>
  );
};
export default ProfileModal;
