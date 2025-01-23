import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import Stars from '../admin/Events/Stars';

const aboutUser =
  'Я – Олена, організатор стендап-шоу, який обожнює створювати унікальні вечори гумору та незабутніх емоцій. ' +
  'Моє головне завдання – забезпечити комфортну атмосферу, де кожен може насолодитися щирими жартами, живим спілкуванням і зарядом позитиву. Завжди відкриваю нові таланти та допомагаю гумористам знайти свого глядача. Давайте разом створювати моменти, які залишаються в серці!';

interface IProps {
  organizer: User;
  rating: number;
}

const AboutUser: React.FC<IProps> = ({ organizer, rating }) => {
  const [isShortAboutUser, setIsShortAboutUser] = useState(true);

  const shortAboutUser = aboutUser?.slice(0, 100);

  return (
    <div>
      <h2 className="text-5xl text-textDark mt-12 mb-8">Про організатора</h2>
      <div className="flex">
        <img
          src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
          alt=""
          className="h-[100px] w-[100px] rounded-full object-cover mr-6"
        />
        <div>
          <h2 className="text-textDark font-lato text-2xl my-2">
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
          <button onClick={() => setIsShortAboutUser(true)} className='flex gap-2 text-base font-semibold focus:outline-none mt-2'>
            Приховати
            <BiChevronDown className="w-6 h-6" />
          </button>
        )}
      </p>
    </div>
  );
};

export default AboutUser;
