import { BiRightArrowCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const ShowAllButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ ...props }) => {
  return (
    <Link
      to={'/all_events'}
      {...props}
      className={`lg:text-[20px] text-base leading-none font-normal text-textDark lg:w-[200px] w-[148px] lg:h-[48px] h-[40px] 
      border-borderColor border-[1px] mx-auto rounded-[15px] flex justify-center items-center gap-[8px]
      focus:outline-none hover:bg-borderColor hover:text-background hover:fill-background
      transition-all duration-300 active:scale-95`}
    >
      <span>Показати усі</span>
      <BiRightArrowCircle className="lg:w-6 lg:h-6 w-[18px] h-[18px]" />
    </Link>
  );
};
