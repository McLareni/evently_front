import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  price: number;
  format: string;
}

const BuyTicket: React.FC<IProps> = ({ price, format }) => {
  return (
    <div className="fixed bottom-0 left-[18px] right-[18px] z-20 bg-background py-4">
      <div className="rounded-[71px_8px] border border-buttonPurple flex flex-row items-center w-full h-12">
        <p className="flex-1 text-center text-base font-bold text-textDark font-lato">
          {price} грн
        </p>
        <Link to={`buy_ticket`} className="flex-1">
          <button
            type="button"
            className={`bg-dark-gradient min-w-[200px] w-full h-12 rounded-[71px_8px] text-background text-base
                      hover:shadow-shadowPrimaryBtn focus:outline-none active:shadow-primaryBtnActive`}
          >
            {price === 0 && format === 'ONLINE'
              ? 'Зареєструватись'
              : 'Купити квиток'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BuyTicket;
