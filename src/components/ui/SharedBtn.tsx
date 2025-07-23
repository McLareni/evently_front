import clsx from 'clsx';

interface SharedBtnProps {
  type: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onClick?: (() => void) | ((e: any) => void);
  className?: string;
  secondary?: boolean;
  primary?: boolean;
}
export const SharedBtn: React.FC<SharedBtnProps> = ({
  type,
  children,
  disabled,
  onClick,
  secondary,
  primary,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `rounded-tl-[71px] font-normal ${className?.includes('text-') ? className : "text-xl"} focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg
         py-2 px-4 ${className?.includes('h') ? className : 'h-[60px]'} ${className}`,

        {
          'border border-buttonPurple bg-transparent text-textDark hover:shadow-shadowSecondaryBtn active:bg-lightPurple':
            secondary && !disabled,
          'bg-buttonPurple text-white hover:shadow-shadowPrimaryBtn active:shadow-primaryBtnActive':
            primary && !disabled,
        },
        {
          'bg-buttonPurple cursor-default text-background opacity-50 active:shadow-none':
            disabled,
        }
      )}
    >
      {children}
    </button>
  );
};
