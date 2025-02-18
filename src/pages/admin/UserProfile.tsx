import { FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiPhoneCall } from 'react-icons/pi';
import { TfiLock } from 'react-icons/tfi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useGetUserProfileQuery } from '@/redux/admin/userApi';

const UserProfile = () => {
  const { idUser } = useParams();
  const { data: userInfo } = useGetUserProfileQuery(idUser || '');

  return (
    <div>
      <Link to={'/admin/users'}>
        <FaArrowLeft />
      </Link>
      <div className="mt-4">
        <div>
          <div className="mt-4 flex gap-4">
            <div className="bg-white rounded-full w-16 h-16"></div>
            <div>
              <h2 className="flex gap-2 items-center">
                {userInfo?.name}
                {userInfo?.status === 'BANNED' && (
                  <span>
                    <TfiLock className="fill-lightRed w-5 h-5" />
                  </span>
                )}
              </h2>
              <p className="text-xs">{userInfo?.role}</p>
            </div>
          </div>
          <p className="mt-5 flex leading-5">
            <span>
              <MdEmail className="w-5 h-5 mr-2" />
            </span>
            {userInfo?.email}
          </p>
          <p className="mt-5 flex leading-5">
            <span>
              <PiPhoneCall className="w-5 h-5 mr-2" />
            </span>
            {userInfo?.phoneNumber ? userInfo.phoneNumber : 'Не вказано'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
