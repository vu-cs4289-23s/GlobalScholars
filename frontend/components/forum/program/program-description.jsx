import Tag from "../all-forums/tag.jsx";
import Rating from "../all-forums/rating.jsx";

const ProgramDescription = ({
                             program,
                             terms,
                             top_tags,
                             overall_rating,
                         }) => {
    return (
        <div className="grid h-auto grid-cols-1 bg-gray-400 bg-opacity-50 sm:mx-20 mx-4 text-left pt-2 pb-6 px-4 rounded-lg">
            <grid-cols-1>
                <span className="text-[30px]">
                  <span className="content-start row ">
                    Study At:
                    <span className="font-bold">
                      {" "}
                        {program}
                    </span>
                  </span>
                </span>
                <p className="pt-4 pb-1 font-bold text-[24px] italic">Terms Offered</p>
                <div className="flex justify-items-center space-x-3 flex-wrap">
                    {terms &&
                        terms.map((tag, index) => (
                            <Tag color={"red-400"} content={tag} name={tag} key={index} />
                        ))}
                </div>
                <p className="pt-4 pb-1 font-bold text-[24px] italic">Top Tags</p>
                <div className="flex justify-items-center space-x-3 flex-wrap">
                    {top_tags &&
                        top_tags.map((tag, index) => (
                            <Tag color={"green-300"} content={tag} name={tag} key={index} />
                        ))}
                </div>
                <p className="py-4 font-bold text-[24px] italic">Overall Rating</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 justify-around justify-items-center text-center">
                    <Rating rating={overall_rating} type={"Overall"} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 justify-around justify-items-center text-center">
                </div>
            </grid-cols-1>
        </div>
    );
};

export default ProgramDescription;
