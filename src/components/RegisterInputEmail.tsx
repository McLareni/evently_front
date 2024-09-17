import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils';
import { GoogleLoginButton, PrivacyAgreement, SharedInput, SharedItemStatusBar } from './ui';
// import { toast } from 'react-toastify';
import { SharedBtn } from './ui/SharedBtn';
import { IRegisterFormInputEmail, IRegisterUser } from '@/types';

interface RegisterInputEmailProps {
  setUserData: React.Dispatch<React.SetStateAction<IRegisterUser>>;
  setStatusAuth: (status: 'register_email' | 'register_password') => void;
  onCloseModal: () => void;
  email: string;
}

export const RegisterInputEmail: React.FC<RegisterInputEmailProps> = ({
  onCloseModal,
  setStatusAuth,
  setUserData,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IRegisterFormInputEmail>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;

    setUserData(prev => ({ ...prev, email }));

    setStatusAuth('register_password');
  };

  return (
    <>
      <h1 className="mb-8">Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <div>
          <SharedInput
            id="email"
            defaultValue={email}
            placeholder="Електронна пошта "
            autocomplete="email"
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          {errors.email?.message && (
            <SharedItemStatusBar
              valid={false}
              text={`${errors?.email?.message}`}
              sizeIcon={``}
              className={`mt-2`}
            />
          )}
        </div>
          <span className="text-base ml-auto mr-auto">або</span>

          <GoogleLoginButton onCloseModal={onCloseModal} />

          <SharedBtn
            type="submit"
            disabled={!isValid}
            className="mt-10 w-[364px] mx-auto"
          >
            Продовжити
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </>
  );
};