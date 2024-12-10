import { MdEmail } from 'react-icons/md';
import { PiPhoneCall } from 'react-icons/pi';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { EventGoogleMap } from '../ui/EventGoogleMap';

const Information = () => {
  const { name, role, email, phone } = useAppSelector(selectUser);

  return (
    <div>
      <EventGoogleMap lat={50.489775} lng={30.436815} />
      <p className="text-xl">Вітаємо у вашому профілі!</p>
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
