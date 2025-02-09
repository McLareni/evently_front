import { useParams } from 'react-router';

import { useGetUserProfileQuery } from '@/redux/users/userApi';

import Spinner from '@/components/ui/Spinner';

import userPlaceholder from '../../public/images/user-placeholder.png';

const UserProfile = () => {
  const { idUser } = useParams();
  const { data: user, isLoading } = useGetUserProfileQuery(idUser || '');

  if (!user && isLoading) {
    return <Spinner />;
  }

  return (
    <div className="px-[32px] py-[21px]">
      <div className="mx-[15px] mt-[15px] h-[192px] bg-bg-gradient rounded-[20px] px-[32px] py-[21px] flex gap-[44px]">
        <img
          src={user?.avatarUrl || userPlaceholder}
          className="w-[150px] h-[150px] rounded-full"
        />
        <p
          className="font-oswald text-[64px] inline-block"
          style={{
            background:
              'linear-gradient(98.01deg, #12C2E9 2.11%, #C471ED 75.16%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Привіт, {user?.name}
        </p>
      </div>
      <div className="mx-[15px] mt-[15px]">
        <p className="my-[24px] font-oswald text-[24px] font-medium">
          Контактна інформація
        </p>
        <div className="flex flex-col">
          <div className="flex gap-[24px] mb-[16px]">
            <div className="relative w-1/3">
              <p
                className="w-full h-[64px] leading-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[24px] border-buttonPurple"
              >
                {user?.name}
              </p>
              <label
                className={`absolute left-6 transition-all ease-in-out
    duration-300 bg-background px-1 -top-3 scale-100 visible opacity-100'
    }`}
              >
                І’мя
              </label>
            </div>

            <div className="relative w-1/3">
              <p
                className="w-full h-[64px] leading-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[24px] border-buttonPurple"
              >
                {user?.surname || '-'}
              </p>
              <label
                className={`absolute left-6 transition-all ease-in-out
    duration-300 bg-background px-1 -top-3 scale-100 visible opacity-100'
    }`}
              >
                Прізвище
              </label>
            </div>
          </div>
          <div className="flex gap-[24px] mb-[8px]">
            <div className="relative w-1/3">
              <p
                className="w-full h-[64px] leading-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[24px] border-buttonPurple"
              >
                {user?.birthdayDate || '-'}
              </p>
              <label
                className={`absolute left-6 transition-all ease-in-out
    duration-300 bg-background px-1 -top-3 scale-100 visible opacity-100'
    }`}
              >
                Дата народженя
              </label>
            </div>
            <div className="relative w-1/3">
              <p
                className="w-full h-[64px] leading-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[24px] border-buttonPurple"
              >
                {user?.phoneNumber || '-'}
              </p>
              <label
                className={`absolute left-6 transition-all ease-in-out
    duration-300 bg-background px-1 -top-3 scale-100 visible opacity-100'
    }`}
              >
                Номер телефону
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
