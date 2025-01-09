import { useState } from 'react';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { GoogleMap } from '../ui/GoogleMap';
import { PopupEventCreated } from '../ui/PopupEventCreated';
import { PopupShareEvent } from '../ui/PopupShareEvent';
import { CropUploadImage } from './CropUploadImage';
import { ProfileForm } from './ProfileForm';

const Information = () => {
  const [image, setImage] = useState<File | null>(null);
  const [showPopup, setPopup] = useState(false);
  const [showPopupShare, setPopupShare] = useState(false);
  const closePopup = () => {
    setPopupShare(false);
  };
  const { name } = useAppSelector(selectUser);

  const getImage = (image: File) => {
    setImage(image);
  };

  const isFakeName = () => {
    return name.length === 0 ? 'гість' : name;
  };

  return (
    <div>
      <div className="-mx-[15px] -mt-[15px] h-[192px] bg-bg-gradient rounded-[20px] px-[32px] py-[21px] flex gap-[48px]">
        <CropUploadImage getImage={getImage} />
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
      <ProfileForm image={image} />
      <button onClick={() => setPopup(true)}>Подія створена</button>
      <button onClick={() => setPopupShare(true)}>Поділитись</button>
      {showPopup && <PopupEventCreated />}
      {showPopupShare && <PopupShareEvent closePopup={closePopup} />}
      <GoogleMap lat={50.432727} lng={30.512317} about="Max Barskih" />
    </div>
  );
};

export default Information;
