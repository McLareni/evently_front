import { SharedItemStatusBar } from '.';

interface RequiredPasswordInterface {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
interface StatusBarPasswordProps {
  requiredPassword: RequiredPasswordInterface;
  className: string;
}
export const StatusBarPassword: React.FC<StatusBarPasswordProps> = ({
  requiredPassword,
  className,
}) => {
  return (
    <ul
      className={`grid grid-cols-2 grid-rows-2 lg:flex w-full text-xs justify-between ${className}`}
    >
      <li className={``}>
        <SharedItemStatusBar
          text="Мінімум 8 символів"
          valid={requiredPassword.hasMinLength}
        />
      </li>
      <li className={``}>
        <SharedItemStatusBar
          text="Велика літера"
          valid={requiredPassword.hasUppercase}
        />
      </li>
      <li className={``}>
        <SharedItemStatusBar text="Цифра" valid={requiredPassword.hasNumber} />
      </li>
      <li className={``}>
        <SharedItemStatusBar
          text="Спеціальний символ"
          valid={requiredPassword.hasSpecialChar}
        />
      </li>
    </ul>
  );
};
