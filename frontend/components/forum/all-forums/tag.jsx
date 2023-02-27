import { useLocation, useParams, useNavigate } from "react-router-dom";

const Tag = ({ content, color, onClick }) => {
  //const navigate = useNavigate();
    const styles = [
        "flex",
        "rounded-full",
        "bg-opacity-100",
        "justify-center",
        "my-1",
        color
    ]

  return (
      <div className={styles.join(" ")}  onClick={onClick}>
        <div className="mx-2 my-1">{content}</div>
      </div>
  );
};

export default Tag;