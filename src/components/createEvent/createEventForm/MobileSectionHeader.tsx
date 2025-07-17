import React from 'react';
import {
  AiFillCheckCircle,
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

interface IProps {
  isActive: boolean;
  text: string;
  dataIsValid?: boolean;
  changeActiveSection: () => void;
}

const MobileSectionHeader: React.FC<IProps> = ({
  isActive,
  text,
  changeActiveSection,
  dataIsValid,
}) => {
  return (
    <div
      className="flex justify-between items-center py-[4px] mb-3 relative"
      onClick={() => changeActiveSection()}
    >
      <h2 className="font-bold text-base font-lato text-textDark">{text}</h2>
      <button type="button" className="focus:outline-0">
        {dataIsValid ? (
          <AiFillCheckCircle className="absolute right-0 -translate-y-1/2 top-1/2 w-6 h-6 fill-success" />
        ) : isActive ? (
          <AiOutlineMinus className="w-6 h-6 fill-textDark" />
        ) : (
          <AiOutlinePlus className="w-6 h-6 fill-textDark" />
        )}
      </button>
    </div>
  );
};

export default MobileSectionHeader;
