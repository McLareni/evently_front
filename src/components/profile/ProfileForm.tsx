import Button from '../ui/Button';
import { ProfileInput } from './ProfileInput';

export const ProfileForm = () => {
  return (
    <form className="flex flex-col">
      <div className="flex gap-[24px] mb-[32px]">
        <ProfileInput placeholder="Ім'я" id="name" htmlFor="name">
          Ім&apos;я
        </ProfileInput>
        <ProfileInput placeholder="Прізвище" id="surname" htmlFor="surname">
          Прізвище
        </ProfileInput>
      </div>
      <div className="flex gap-[24px] mb-[32px]">
        <ProfileInput placeholder="Дата народження" id="birth" htmlFor="birth">
          Дата народження
        </ProfileInput>
        <ProfileInput placeholder="Номер телефону" id="phone" htmlFor="phone">
          Номер телефону
        </ProfileInput>
      </div>
      <div className="ml-auto">
        <Button>Зберегти</Button>
      </div>
    </form>
  );
};
