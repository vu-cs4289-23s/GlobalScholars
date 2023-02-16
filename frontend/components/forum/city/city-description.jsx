import { Link } from "react-router-dom";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Login from "../../login&register/login.jsx";

const CityDescription = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-400 bg-opacity-50 mx-20">
      <grid-cols-1>
        <div className="content-start row">Travel To: Copenhagen, Denmark</div>
        <div>
          Copenhagen is the capital and largest city of Denmark, known for its
          beautiful architecture, rich history, and vibrant cultural scene, as
          well as being a hub for innovation and sustainability. The city is
          also famous for attractions such as Tivoli Gardens, The Little Mermaid
          statue, and the historic district of Nyhavn.
        </div>
      </grid-cols-1>
    </div>
  );
};

export default CityDescription;
