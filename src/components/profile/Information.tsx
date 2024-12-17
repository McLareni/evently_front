import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { PiPhoneCall } from 'react-icons/pi';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { ProfileForm } from './ProfileForm';
import { UploadButton } from './UploadButton';

const Information = () => {
  const [image, setImage] = useState<File | null>(null);

  const { name, role, email, phone } = useAppSelector(selectUser);

  const getImage = (image: File) => {
    setImage(image);
  };

  console.log(image);

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
          Привіт, {name}
        </p>
      </div>
      <p className="my-[32px] font-oswald text-[24px] font-medium">
        Контактна інформація
      </p>
      <ProfileForm />
      <div>
        <div className="mt-4 flex gap-4">
          <div className="bg-white rounded-full w-16 h-16"></div>
          <div>
            <h2>{name}</h2>
            <p className="text-xs">{role}</p>
          </div>
        </div>
        <p className="mt-5 flex leading-5">
          <span>
            <MdEmail className="w-5 h-5 mr-2" />
          </span>
          {email}
        </p>
        <p className="mt-5 flex leading-5">
          <span>
            <PiPhoneCall className="w-5 h-5 mr-2" />
          </span>
          {phone ? phone : 'Не вказано'}
        </p>
      </div>
    </div>
  );
};

export default Information;
