import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router';

import userPlaceholder from '../../../public/images/user-placeholder.png';
import Stars from '../admin/Events/Stars';

interface IProps {
  organizer: User;
  rating: number;
  aboutUser: string;
}

const AboutUser: React.FC<IProps> = ({ organizer, rating, aboutUser }) => {
  const [isShortAboutUser, setIsShortAboutUser] = useState(true);
  const navigate = useNavigate();

  const shortAboutUser = aboutUser?.slice(0, 100);

  return (
    <div>
      <h2 className="text-5xl text-textDark mt-12 mb-8">Про організатора</h2>
      <div className="flex">
        <img
          src={
            organizer?.avatarImage?.url
              ? organizer.avatarImage.url
              : userPlaceholder
          }
          alt=""
          className="h-[100px] w-[100px] rounded-full object-cover mr-6"
        />
        <div>
          <h2
            className="text-textDark font-lato text-2xl my-2 underline hover:cursor-pointer"
            onClick={() => navigate(`/user/${organizer.id}`)}
          >
            {organizer?.name}
          </h2>
          <div className="flex">
            <span className="mr-2">
              <Stars rating={rating || 0} />
            </span>
            ({rating})
          </div>
        </div>
      </div>
      {aboutUser && (
        <p className="text-[18px] leading-[27px] text-textDark mt-8">
          {isShortAboutUser ? `${shortAboutUser}...` : aboutUser}
          {isShortAboutUser ? (
            <button
              onClick={() => setIsShortAboutUser(false)}
              className="flex gap-2 underline text-base focus:outline-none mt-2"
            >
              Читати більше
              <BiChevronDown className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setIsShortAboutUser(true)}
              className="flex gap-2 underline text-base focus:outline-none mt-2"
            >
              Приховати
              <BiChevronDown className="w-6 h-6" />
            </button>
          )}
        </p>
      )}
    </div>
  );
};

export default AboutUser;
