import { useState } from 'react';

interface PaymentInfoProps {
  className?: string;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ className }) => {
  const [shownTooltip, setShownTooltip] = useState(false);

  const showTooltip = () => {
    setShownTooltip(true);
  };

  const hideTooltip = () => {
    setShownTooltip(false);
  };

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className={`${className} absolute -top-3 border-[1px]
                border-buttonPurple w-[14px] h-[14px] rounded-full
                flex justify-center items-center cursor-help`}
    >
      <span className="text-[10px] text-buttonPurple">?</span>
      {shownTooltip && (
        <div className="absolute left-[20px]">
          <div className="relative w-[130px]">
            <img
              src="/images/ticket/payment-info.svg"
              width={138}
              height={70}
            />
            <p className="leading-[1.5] text-[12px] absolute left-[20px] top-[6px]">
              Плата за обробку
              <br />
              замовлення, сервіс
              <br />і нашу роботу
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
