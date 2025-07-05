import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

interface ButtonForSectionProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ButtonForSection: React.FC<ButtonForSectionProps> = ({
  onClick,
  children,
}) => {
  const { isDesktop } = useMediaVariables();

  return (
    <button
      onClick={onClick}
      className={`${isDesktop ? 'flex gap-2 underline text-base' : 'text-xs rounded-[10px] border border-buttonPurple px-5 py-[7px]'} focus:outline-none mt-2 `}
      type="button"
    >
      {children}
      {isDesktop && <BiChevronDown className="w-6 h-6" />}
    </button>
  );
};

export default ButtonForSection;
