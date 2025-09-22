import React from 'react';
import { toast } from 'react-toastify';

import { getUser, googleLogIn } from '@/redux/auth/operations';
import { useAppDispatch } from '@/redux/hooks';

import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginProps {
  onCloseModal?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginProps> = ({
  onCloseModal,
}) => {
  const dispatch = useAppDispatch();

  const onSubmit = async (idToken: string) => {
    try {
      const { payload } = await dispatch(googleLogIn(idToken));

      toast.success(`Вітаю ${payload.userName}`);
      dispatch(getUser());
      if (onCloseModal) onCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      shape="pill"
      size="large"
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
        if (credentialResponse.credential) {
          onSubmit(credentialResponse.credential);
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
