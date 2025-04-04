/* eslint-disable no-unused-vars */
interface Action3Props {
  event: Event | undefined;
  getPrice: (price: number) => void;
  getTicketCount: (count: number) => void;
}

export const Action3: React.FC<Action3Props> = ({
  event,
  getPrice,
  getTicketCount,
}) => {
  return (
    <div className="bg-[url('/images/ticket/download-ticket.svg')] bg-cover bg-center w-full h-[340px] px-[64px] py-[36px] flex flex-col justify-between">
      <div>d</div>
    </div>
  );
};
