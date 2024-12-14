import { HTMLProps, PropsWithChildren, useState } from 'react';

interface ProfileInputProps
  extends PropsWithChildren<HTMLProps<HTMLInputElement>> {
  error?: string;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({
  children,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <fieldset className="relative">
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="true"
        {...props}
        placeholder={isFocused ? '' : props.placeholder}
        className={`w-[312px] h-[64px] border-[2px] rounded-[10px]
          px-[24px] outline-none bg-background text-[24px]
          ${isFocused ? 'border-buttonPurple' : 'border-lightPurple'}`}
      />
      {isFocused && (
        <label className="absolute -top-3 left-4 bg-background px-1">
          {children}
        </label>
      )}
      <div>{error && <span>{error}</span>}</div>
    </fieldset>
  );
};
