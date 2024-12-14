import { HTMLProps, PropsWithChildren, forwardRef, useState } from 'react';

interface ProfileInputProps
  extends PropsWithChildren<HTMLProps<HTMLInputElement>> {
  error?: string;
}

type Ref = HTMLInputElement;

export const ProfileInput = forwardRef<Ref, ProfileInputProps>(
  ({ children, error, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const inputStyles = `w-[312px] h-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[24px]
    focus:placeholder-transparent
    ${isFocused ? 'border-buttonPurple' : 'border-lightPurple'}`;

    const labelStyles = `absolute left-6 transition-all ease-in-out duration-300
    bg-background px-1 ${
      isFocused
        ? '-top-3 scale-100 visible opacity-100'
        : 'top-4 scale-125 invisible opacity-0'
    }`;

    return (
      <fieldset className="relative">
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          autoComplete="true"
          className={inputStyles}
          ref={ref}
          {...props}
        />
        <label htmlFor={props.htmlFor} className={labelStyles}>
          {children}
        </label>
        <div className="h-[24px]">
          {error && <span className="text-error">{error}</span>}
        </div>
      </fieldset>
    );
  }
);

ProfileInput.displayName = 'ProfileInput';
