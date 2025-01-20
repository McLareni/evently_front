import { BiRightArrowCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const ShowAllButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ ...props }) => {
  return (
    <Link
      to={'/all_events'}
      {...props}
      className="w-[200px] h-[48px] border-borderColor border-[1px] mx-auto
    rounded-[15px] flex justify-center items-center gap-[8px] focus:outline-none
    hover:bg-borderColor hover:text-background hover:fill-background
    transition-all duration-300 active:scale-95"
    >
      <span>Показати усі</span>
      <BiRightArrowCircle className="w-6 h-6" />
    </Link>
  );
};
