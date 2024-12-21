import { forwardRef } from 'react';
import InputMask, { Props } from 'react-input-mask';

import { ProfileInput, ProfileInputProps } from './ProfileInput';

interface MaskedInputProps extends Omit<Props, 'children'> {
  mask: string;
  error?: string;
  children: string;
  autoComplete?: 'on' | 'off' | string;
  htmlFor: string;
}

export const ProfileInputMask = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ children, error, mask, ...props }, ref) => {
    return (
      <InputMask mask={mask} {...props}>
        {(inputProps: ProfileInputProps) => (
          <ProfileInput ref={ref} error={error} {...inputProps}>
            {children}
          </ProfileInput>
        )}
      </InputMask>
    );
  }
);

ProfileInputMask.displayName = 'MaskedInput';
