import { ButtonHTMLAttributes } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface PrevNextBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const PrevNextBtn: React.FC<PrevNextBtnProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      aria-label="change slide button"
      className={`${className} flex items-center w-[48px] h-[48px] justify-center
      focus:outline-none transition-all duration-300 active:scale-90`}
    >
      <MdKeyboardArrowLeft size="48" />
    </button>
  );
};
