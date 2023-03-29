const Tag = ({ name, content, color, onClick }) => {
  //const navigate = useNavigate();
  const background = color;

  const tag = [
    "flex",
    "rounded-full",
    "bg-opacity-100",
    "text-xs",
    "text-black",
    "sm:text-base",
    "justify-center",
    "my-1",
    "cursor-pointer",
    background,
  ];

  return (
    <div name={name} className={tag.join(" ")} onClick={onClick}>
      <div name={name} className="mx-2 my-1">{content}</div>
    </div>
  );
};

export default Tag;
