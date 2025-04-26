import { HTMLProps, forwardRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface BuyTicketInputProps extends HTMLProps<HTMLInputElement> {
  forPassword?: boolean;
  error?: string;
  label: string;
  width?: string;
  discount: number;
}

export const BuyTicketInput = forwardRef<HTMLInputElement, BuyTicketInputProps>(
  (
    {
      label,
      error,
      forPassword = false,
      onBlur,
      width = '312',
      discount,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputStyles = `w-full h-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[20px]
    focus:placeholder-transparent border-buttonPurple
    ${forPassword && 'pr-[72px]'}
    ${discount > 0 && 'border-success text-success'}`;

    const labelStyles = `absolute left-6 transition-all ease-in-out
    duration-300 bg-background px-1 -top-2 scale-100 visible opacity-100`;

    const buttonStyles = `absolute top-[50%] -translate-y-2/4 right-[24px] 
    focus:outline-none`;

    const toggleVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <fieldset
        style={{ width: `${width}px` }}
        className={`relative font-lato`}
      >
        <div className="relative">
          <input
            autoComplete="on"
            onFocus={() => setIsFocused(true)}
            onBlur={event => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            className={inputStyles}
            type={
              forPassword ? (passwordVisible ? 'text' : 'password') : props.type
            }
            ref={ref}
            {...props}
          />
          {forPassword && (
            <button
              className={buttonStyles}
              onClick={toggleVisibility}
              type="button"
            >
              {passwordVisible ? (
                <AiOutlineEye size={24} />
              ) : (
                <AiOutlineEyeInvisible size={24} />
              )}
            </button>
          )}
        </div>
        <label htmlFor={props.htmlFor} className={labelStyles}>
          {label}
        </label>
        <div className="h-[24px]">
          {error && <span className="text-error">{error}</span>}
        </div>
      </fieldset>
    );
  }
);

BuyTicketInput.displayName = 'BuyTicketInput';
