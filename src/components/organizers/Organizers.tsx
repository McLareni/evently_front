import { Link } from 'react-router-dom';

import { useScreenWidth } from '@/hooks/useScreenWidth';

import { SharedBtn } from '../ui';

export const Organizers: React.FC = () => {
  const width = useScreenWidth();

  return (
    <div
      className="lg:mt-[50px] flex flex-col lg:flex-row max-w-[1358px] w-full lg:py-[18px] lg:rounded-[20px] lg:ml-[41px] 
                    lg:mr-[43px] bg-gradient-to-br from-[#E9E6FF] to-[#D5FEFF] lg:px-[43px] p-4"
    >
      <div className="lg:pr-[54px]">
        <h1 className="lg:w-[392px] lg:pb-8 pb-[19px] lg:text-[64px] text-[28px] lg:leading-[95px] leading-normal">
          Створи подію, про яку говоритимуть!
        </h1>
        {width >= 1024 && (
          <Link to="/organizers">
            <SharedBtn
              type="button"
              secondary
              className={`w-[276px] mx-auto h-[48px]`}
            >
              Стати організатором
            </SharedBtn>
          </Link>
        )}
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:items-center flex flex-col gap-4">
        <div className="flex lg:w-[424px] lg:pr-[24px]">
          <h1 className="lg:pt-5 min-w-[47px] lg:min-w-[64px] lg:text-[64px] text-[32px]">
            01
          </h1>
          <div className="relative lg:ml-4 pl-6">
            <span
              style={{
                content: '',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#E2DEFF',
              }}
            />
            <h2 className="lg:pb-8 pb-3 text-buttonPurple lg:text-[24px] text-[20px] lg:leading-9 leading-[30px]">
              Безкоштовно створюй подію
            </h2>
            <p className="leading-[1.2]">
              З нами ти можеш легко та безкоштовно запустити свій захід. Ніяких
              прихованих витрат — лише твої ідеї!
            </p>
          </div>
        </div>
        <div className="flex lg:w-[424px]">
          <h1 className="lg:pt-5 min-w-[47px] lg:min-w-[64px] lg:text-[64px] text-[32px]">
            02
          </h1>
          <div className="relative lg:ml-4 pl-6">
            <span
              style={{
                content: "''",
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#E2DEFF',
              }}
            />
            <h2 className="lg:pb-8 pb-3 text-borderColor lg:text-[24px] text-[20px] lg:leading-9 leading-[30px]">
              Довір просування нам!
            </h2>
            <p className="lg:w-[312px] leading-[1.2]">
              Не витрачай час на рекламу, ми рекламуємо, щоб ти зосередився на
              головному.
            </p>
          </div>
        </div>
        <div className="flex lg:w-[424px]">
          <h1 className="lg:pt-5 min-w-[47px] lg:min-w-[64px] lg:text-[64px] text-[32px]">
            03
          </h1>
          <div className="relative lg:ml-4 pl-6">
            <span
              style={{
                content: "''",
                position: 'absolute',
                left: width >= 1024 ? '-5px' : '0',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#E2DEFF',
              }}
            />
            <h2 className="lg:pb-8 pb-3 text-borderColor lg:text-[24px] text-[20px] lg:leading-9 leading-[30px]">
              Продавай та заробляй
            </h2>
            <p className="lg:w-[312px] leading-[1.2]">
              Організуй подію, продавай квитки та отримуй дохід. Прокачуй
              рейтинг та отримуй бонуси на платформі.
            </p>
          </div>
        </div>
        <div className="flex lg:w-[424px]">
          <h1 className="lg:pt-5 min-w-[47px] lg:min-w-[64px] lg:text-[64px] text-[32px]">
            04
          </h1>
          <div className="relative lg:ml-4 pl-6">
            <span
              style={{
                content: "''",
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#E2DEFF',
              }}
            />
            <h2 className="lg:pb-8 pb-3 text-buttonPurple lg:text-[24px] text-[20px] lg:leading-9 leading-[30px]">
              Зручний інтерфейс
            </h2>
            <p className="leading-[1.2]">
              Створюй подію в декілька кліків, легко редагуй та стеж за продажами.
            </p>
          </div>
        </div>
      </div>
      {width < 1024 && (
        <Link to="/organizers" className="w-min mx-auto mt-6">
          <SharedBtn
            type="button"
            secondary
            className={`w-[215px] mx-auto h-[40px] text-base`}
          >
            Стати організатором
          </SharedBtn>
        </Link>
      )}
    </div>
  );
};
