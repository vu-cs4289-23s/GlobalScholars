import { useLocation, useParams, useNavigate } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

const Rating = ({ rating, type }) => {
  const navigate = useNavigate();
  return (
    <div>
      {rating === 1 ?
        <BsStarFill color={"black"} style={{ height: "30px", width: "30px" }}/> : rating === 2 ?
          <span style={{ display: "flex" }}>
              <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
              <BsStarFill color={"black"} style={{ height: "30px", width: "30px" }}/>
            </span> :
          rating === 3 ?
            <span style={{ display: "flex" }}>
                <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                <BsStarFill color={"black"} style={{ height: "30px", width: "30px" }}/>
              </span> :
            rating === 4 ?
              <span style={{ display: "flex" }}>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px" }}/>
                </span> :
              <span style={{ display: "flex" }}>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px", marginRight: "3px" }}/>
                  <BsStarFill color={"black"} style={{ height: "30px", width: "30px" }}/>
                </span>
      }
    </div>
  );
};

export default Rating;
