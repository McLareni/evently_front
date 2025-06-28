import { SharedBtn } from '../ui';

interface RegisterConirmEmailProps {
  // eslint-disable-next-line no-unused-vars
  setStatusAuth: (status: 'register_email') => void;
}
export const RegisterConfirmEmail: React.FC<RegisterConirmEmailProps> = ({
  setStatusAuth,
}) => {
  return (
    <div className={` flex flex-col h-full justify-between`}>
      <div className="flex flex-col justify-start gap-[32px] lg:w-[500px]">
        <h1 className="leading-[1] text-[32px] lg:text-[64px] text-center lg:text-left">
          Активація акаунту
        </h1>
        <p className="text-center lg:text-left text-xl lg:w-[500px]">
          Для завершення реєстрації перевірте свою електронну пошту та перейдіть
          за посиланням у листі.
        </p>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between kg:mt-8">
          <SharedBtn type="button" primary className="lg:w-60">
            Відправити повторно
          </SharedBtn>

          <SharedBtn
            onClick={() => setStatusAuth('register_email')}
            type="button"
            secondary
            className="lg:w-60"
          >
            Змінити email
          </SharedBtn>
        </div>
      </div>
    </div>
  );
};
