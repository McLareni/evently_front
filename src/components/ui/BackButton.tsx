import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface IProps {
  click: () => void;
}

const BackButton: React.FC<IProps> = ({ click }) => {
  return (
    <button
      onClick={click}
      className="absolute top-3 p-2 left-4 lg:left-[439px]"
    >
      <BiArrowBack className="w-8 h-8" />
    </button>
  );
};

export default BackButton;
