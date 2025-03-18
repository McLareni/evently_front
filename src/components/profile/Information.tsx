import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { CropUploadImage } from './CropUploadImage';
import { ProfileForm } from './ProfileForm';

const Information = () => {
  const { name } = useAppSelector(selectUser);

  const isFakeName = () => {
    return name.length === 0 ? 'гість' : name;
  };

  return (
    <div>
      <div className="h-[192px] bg-bg-gradient rounded-[20px] px-[32px] py-[21px] flex gap-[48px]">
        <CropUploadImage />
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
          Привіт, {isFakeName()}
        </p>
      </div>
      <p className="my-[24px] font-oswald text-[24px] font-medium">
        Контактна інформація
      </p>
      <ProfileForm />
    </div>
  );
};

export default Information;
