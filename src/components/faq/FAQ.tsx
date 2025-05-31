import React, { useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { Container } from '../container/Container';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = [
    {
      title: 'Чи можу я повернути квиток, якщо не зможу відвідати подію?',
      content:
        'Так, повернення квитків доступно не пізніше, ніж за 24 години до початку події.',
    },
    {
      title: 'Чи можу я передати свій квиток іншій особі?',
      content:
        'Зазвичай так, але це залежить від умов організатора. Перевірте інформацію на сторінці події.',
    },
    {
      title: 'Чи можу я редагувати інформацію про подію після публікації?',
      content:
        'Так, зайдіть у свій акаунт>Мої події>відредагувати. Та дочекайтесь підтвердження змін від модератора BookMyEvent.',
    },
    {
      title: 'Як я можу вивести кошти від продажу квитків?',
      content:
        'Всі отримані кошти від квитків ви отримуєте на рахунок аккаунта, які можна вивести на будь-яку банківську карту.',
    },
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="flex lg:flex-row flex-col lg:ml-[40px] lg:mt-[64px] lg:pb-[50px] pb-[32px]">
      <h1 className="w-[89px] lg:leading-[94.85px] leading-normal text-[28px] lg:text-[64px] lg:mr-[20px] ">
        FAQ
      </h1>
      <div className="space-y-4 lg:ml-[136px] lg:w-[872px] mt-4 lg:mt-0">
        {items.map((item, index) => (
          <div key={index}>
            <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#E9E6FF] to-[#D5FEFF]">
              <button
                className="w-full flex justify-between items-center lg:p-6 px-6 py-3 text-left text-lg font-medium text-gray-800 focus:outline-none"
                onClick={() => toggleIndex(index)}
                aria-expanded={openIndex === index}
              >
                <h2 className="lg:font-medium lg:text-2xl lg:mr-0 mr-4 text-base font-normal">
                  {item.title}
                </h2>
                <BiChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ease-in-out ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                ref={el => (contentRefs.current[index] = el)}
                style={{
                  height:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : '0px',
                }}
                className="transition-[height] duration-300 ease-in-out"
              >
                <div className="lg:pb-9 pb-3 px-6 text-gray-600 lg:text-base text-xs">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
