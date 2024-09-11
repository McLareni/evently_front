import { Link } from 'react-router-dom';
interface PrivacyAgreementProps {
  className?: string;
}

export const PrivacyAgreement: React.FC<PrivacyAgreementProps> = ({ className }) => {
  return (
    <p
      className={`text-center text-base font-normal w-[520px] opacity-50 ${className} `}
    >
      Натискаючи кнопку "Зареєструватися" я погоджуюся з{' '}
      <Link to="/privacy-policy" className='underline' >Політикою конфіденційності</Link> та{' '}
      <Link to="/terms-of-service" className='underline' >Правилами використання</Link> сервісу.
    </p>
  );
};
