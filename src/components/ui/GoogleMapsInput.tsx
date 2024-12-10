import { HTMLProps, forwardRef } from 'react';

type InputProps = {
  label?: string;
} & HTMLProps<HTMLInputElement>;

type Ref = HTMLInputElement;

export const GoogleMapsInput = forwardRef<Ref, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <fieldset className="w-full">
        <label htmlFor={props.htmlFor}>{label}</label>
        <input className="w-full" autoComplete="true" ref={ref} {...props} />
      </fieldset>
    );
  }
);

GoogleMapsInput.displayName = 'Input';
