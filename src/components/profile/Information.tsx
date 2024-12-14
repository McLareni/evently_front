import { AiOutlineUpload } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { PiPhoneCall } from 'react-icons/pi';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { ProfileForm } from './ProfileForm';

const Information = () => {
  const { name, role, email, phone } = useAppSelector(selectUser);

  return (
    <div>
      <div className="-mx-[15px] -mt-[15px] h-[214px] bg-bg-gradient rounded-[20px] p-[32px] flex gap-[48px]">
        <button className="w-[150px] h-[150px] bg-uploadBtnBg rounded-full flex justify-center items-center">
          <AiOutlineUpload size={32} />
        </button>
        <p className="font-oswald text-[64px] bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text">
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
