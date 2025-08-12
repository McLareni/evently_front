import React from 'react';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

interface IProps {
  openPage: () => void;
}

const WithdrawingMoney: React.FC<IProps> = ({ openPage }) => {
  const { isDesktop } = useMediaVariables();

  return (
    <div className=" max-w-[500px] my-5">
      {isDesktop && (
        <p className="lg:mb-[24px] mb-4 mt-8 font-oswald lg:text-[24px] text-xl lg:font-medium font-normal">
          Ваш баланс
        </p>
      )}
      <div className="bg-[#ECF2F9] p-4 text-textDark rounded-[10px] flex flex-col gap-3 items-center">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-medium">Баланс</h2>
          <p className="text-base font-bold">7000₴</p>
        </div>
        <div className="w-full flex justify-between text-[#838789]">
          <h3 className="text-base">Виведено коштів</h3>
          <p className="text-base font-normal">400₴</p>
        </div>
        <button
          onClick={openPage}
          className="p-3 mt-3 bg-background border-2 border-buttonPurple rounded-[15px] text-xl leading-5"
        >
          Вивести кошти
        </button>
      </div>
    </div>
  );
};

export default WithdrawingMoney;
