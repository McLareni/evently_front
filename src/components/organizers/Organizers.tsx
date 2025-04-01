import { Link } from 'react-router-dom';

import { SharedBtn } from '../ui';

export const Organizers: React.FC = () => {
  return (
    <div className="mt-[50px] flex w-[1358px]  py-[18px] rounded-[20px] ml-[41px] mr-[43px] bg-gradient-to-br from-[#E9E6FF] to-[#D5FEFF] px-[43px]">
      <div className="pr-[54px]">
        <h1 className="w-[392px] pb-8">Створи подію, про яку говоритимуть!</h1>
        <Link to="/organizers">
          <SharedBtn
            type="button"
            secondary
            className={`w-[276px] mx-auto h-[48px]`}
          >
            Стати організатором
          </SharedBtn>
        </Link>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 items-center">
        <div className="flex w-[424px] pr-[24px]">
          <h1 className="pt-5">01</h1>
          <div className="relative ml-4 pl-6">
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
            <h2 className="pb-8 text-buttonPurple">
              Безкоштовно створюй подію
            </h2>
            <p>
              З нами ти можеш легко та безкоштовно запустити свій захід. Ніяких
              прихованих витрат — лише твої ідеї!
            </p>
          </div>
        </div>
        <div className="flex w-[424px]">
          <h1 className="pt-5">02</h1>
          <div className="relative ml-4 pl-6">
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
            <h2 className="pb-8 text-borderColor"> Довір просування нам!</h2>
            <p className="w-[312px]">
              Не витрачай час на рекламу, ми рекламуємо, щоб ти зосередився на
              головному.
            </p>
          </div>
        </div>
        <div className="flex w-[424px]">
          <h1 className="pt-5">03</h1>
          <div className="relative ml-4 pl-6">
            <span
              style={{
                content: "''",
                position: 'absolute',
                left: '-5px',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#E2DEFF',
              }}
            />
            <h2 className="pb-8 text-borderColor">Продавай та заробляй</h2>
            <p className="w-[312px]">
              Організуй подію, продавай квитки та отримуй дохід. Прокачуй
              рейтинг та отримуй бонуси на платформі.
            </p>
          </div>
        </div>
        <div className="flex w-[424px]">
          <h1 className="pt-5">04</h1>
          <div className="relative ml-4 pl-6">
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
            <h2 className="pb-8 text-buttonPurple">Зручний інтерфейс</h2>
            <p>
              Створюй подію в декілька кліків, з легкістю внось правки та
              слідкуй за статистикою продажів у режимі реального часу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
