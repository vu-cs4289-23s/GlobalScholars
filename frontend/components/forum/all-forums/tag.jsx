const Tag = ({ content, color, onClick }) => {
  //const navigate = useNavigate();
  const tag = [
    "flex",
    "rounded-full",
    "bg-opacity-100",
    "text-xs",
    "text-white",
    "sm:text-base",
    "justify-center",
    "my-1",
    "cursor-pointer",
    "hover:bg-opacity-50",
    color,
  ];

  return (
    <div className={tag.join(" ")} onClick={onClick}>
      <div className="mx-2 my-1">{content}</div>
    </div>
  );
};

export default Tag;
