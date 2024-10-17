import React, { useState } from 'react';

const SavedMaterial = () => {
  const [activeButton, setActiveButton] = useState('all');

  const buttons = ['all', 'PYQ', 'E-Books', 'Videos', 'Courses', 'Live Classes', 'Projects'];

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
      <div className="bg-white w-full h-[51px] pl-[100px] max-lg-xs:pl-6 flex items-center justify-start gap-3 overflow-x-auto">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`border-2 p-1 px-5 rounded-3xl  text-nowrap ${
              activeButton === button
                ? 'bg-[#79B05833] text-[#1E5000] border-[#1E5000]'
                : ''
            }`}
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SavedMaterial;
