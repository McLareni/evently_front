import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  children?: ReactNode;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  children,
  className,
  ...props
}) => {
  return (
    <button className={`${className} focus:outline-none relative`} {...props}>
      <Icon className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
      {children}
    </button>
  );
};
