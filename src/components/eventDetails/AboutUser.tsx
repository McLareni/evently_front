import React, { useState } from 'react';

import userPlaceholder from '../../../public/images/user-placeholder.png';
import Stars from '../admin/Events/Stars';
import ButtonForSection from './ButtonForSection';

interface IProps {
  organizer: User;
  rating: number;
  aboutUser: string;
}

const AboutUser: React.FC<IProps> = ({ organizer, rating, aboutUser }) => {
  const [isShortAboutUser, setIsShortAboutUser] = useState(true);

  const isFullText = aboutUser.length < 100;
  const shortAboutUser = aboutUser?.slice(0, 100);

  return (
    <div>
      <h2 className="lg:text-5xl text-[32px] leading-normal text-textDark lg:mt-12 lg:mb-8 mb-2">
        Про організатора
      </h2>
      <div className="flex items-center">
        <img
          src={
            organizer?.avatarImage?.url
              ? organizer.avatarImage.url
              : userPlaceholder
          }
          alt=""
          className="lg:h-[100px] lg:w-[100px] w-8 h-8 rounded-full object-cover lg:mr-6 mr-4"
        />
        <div className='flex flex-col lg:gap-2'>
          <h2
            className="text-textDark font-lato lg:text-2xl text-sm lg:underline"
          >
            {organizer?.name}
          </h2>
          <div className="flex text-textDark lg:text-base text-xs">
            <span className="mr-2">
              <Stars rating={rating || 0} />
            </span>
            ({rating})
          </div>
        </div>
      </div>
      {aboutUser && (
        <p className="lg:text-[18px] text-sm lg:leading-[27px] leading-normal text-textDark lg:mt-8 mt-2">
          {isShortAboutUser && !isFullText ? `${shortAboutUser}...` : aboutUser}
          {!isFullText &&
            (isShortAboutUser ? (
              <ButtonForSection onClick={() => setIsShortAboutUser(false)}>
                Читати більше
              </ButtonForSection>
            ) : (
              <ButtonForSection onClick={() => setIsShortAboutUser(true)}>
                Приховати
              </ButtonForSection>
            ))}
        </p>
      )}
    </div>
  );
};

export default AboutUser;
