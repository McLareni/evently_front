import { PrivacyAgreement, SharedBtn } from './ui';

interface RegisterConirmEmailProps {
  setStatusAuth: (status: 'register_email') => void;
}
export const RegisterConirmEmail: React.FC<RegisterConirmEmailProps> = ({
  setStatusAuth,
}) => {
  
  return (
    <div className={`flex flex-col h-full justify-between`}>
      <div className="flex flex-col justify-start gap-[63px] w-[500px]">
        <h1>Активація акаунту</h1>
        <p className="text-start text-xl w-[500px]">
          Для завершення реєстрації перевірте свою електронну пошту та перейдіть
          за посиланням у листі.
        </p>
        <div className="flex justify-between -mt-4">
          <SharedBtn type="button" className="w-60">
            Відправити повторно
          </SharedBtn>
          <SharedBtn
            onClick={() => setStatusAuth('register_email')}
            type="button"
            transparent
            className="w-60"
          >
            Змінити email
          </SharedBtn>
        </div>
      </div>
      <PrivacyAgreement />
    </div>
  );
};