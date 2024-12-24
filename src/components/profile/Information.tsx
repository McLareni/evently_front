import { useState } from 'react';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { ProfileForm } from './ProfileForm';
import { UploadButton } from './UploadButton';

const Information = () => {
  const [image, setImage] = useState<File | null>(null);

  const { name } = useAppSelector(selectUser);

  const getImage = (image: File) => {
    setImage(image);
  };

  const isFakeName = () => {
    return name.length === 0 ? 'гість' : name;
  };

  return (
    <div>
      <div className="-mx-[15px] -mt-[15px] h-[214px] bg-bg-gradient rounded-[20px] p-[32px] flex gap-[48px]">
        <UploadButton getImage={getImage} />
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
      <p className="my-[32px] font-oswald text-[24px] font-medium">
        Контактна інформація
      </p>
      <ProfileForm image={image} />
    </div>
  );
};

export default Information;
