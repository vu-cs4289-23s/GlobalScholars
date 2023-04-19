import { city_tags, program_tags } from '../../../../data.js';
import { useEffect, useState } from 'react';
import program from '../../../../backend/models/program.js';

const Tag = ({ id, opacity, onClick }) => {
  let [color, setColor] = useState('');
  let [content, setContent] = useState('');
  const [selected, setSelected] = useState(false);

  const style = `
    flex
    rounded-full
    bg-opacity-${opacity}
    hover:bg-opacity-100
    text-xs
    text-black
    sm:text-base
    justify-center
    my-1
    cursor-pointer
    bg-${color}
    ${selected ? 'border-2 border-black' : ''}
  `;


  function findTag(item) {
    if (item.id === id) {
      setColor(item.color);
      setContent(item.content);
    }
  }

  useEffect(() => {
    // check city
    city_tags.forEach(findTag);
    // check program
    program_tags.forEach(findTag);
  }, []);

  return (
    <div
      id={id}
      className={`${style}`}
      onClick={() => {
        setSelected(!selected);
        onClick(id);
      }}
    >
      <div id={id} className="mx-2 my-1">
        {content}
      </div>
    </div>
  );
};

export default Tag;
