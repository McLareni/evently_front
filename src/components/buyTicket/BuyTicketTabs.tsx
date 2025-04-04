interface BuyTicketTabsProps {
  currentAction: number;
}

export const BuyTicketTabs: React.FC<BuyTicketTabsProps> = ({
  currentAction,
}) => {
  return (
    <div className="mb-[10px] flex justify-between">
      <div
        className={`${currentAction === 1 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
      >
        <div>
          <span className="text-[14px]">Оберіть квиток</span>
        </div>
      </div>
      <div
        className={`${currentAction === 2 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
      >
        <div>
          <span className="text-[14px]">Доставка і оплата</span>
        </div>
      </div>
      <div
        className={`${currentAction === 3 ? 'bg-[url(/images/ticket/buy-ticket-tab-active.svg)]' : 'bg-[url(/images/ticket/buy-ticket-tab.svg)]'} bg-cover bg-center w-[400px] h-[20px] flex justify-center align-center`}
      >
        <div>
          <span className="text-[14px]">Насолоджуйтесь подією</span>
        </div>
      </div>
    </div>
  );
};
