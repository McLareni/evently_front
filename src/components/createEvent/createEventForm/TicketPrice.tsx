import { useEffect, useState } from "react";
import { HiOutlineTicket } from "react-icons/hi";

type TicketPriceProps = {
  price: string;
  onPriceChange: (price: string) => void;
  handleNumberOfTicketsChange: (numberOfYickets: number) => void;
};

const TicketPrice: React.FC<TicketPriceProps> = ({ price, onPriceChange, handleNumberOfTicketsChange }) => {
  const [freeTickets, setFreeTickets] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(''); 

  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setInputValue(value); 
    
    if (value) {
      onPriceChange(`${value} ₴`);
    } else {
      onPriceChange('Ціна'); 
    }
  };

  useEffect(() => {
    if (freeTickets) {
      onPriceChange('Безкоштовно');
    } else if (!freeTickets && price === 'Безкоштовно') {
      onPriceChange('Ціна'); 
    } else if (!freeTickets && price !== 'Безкоштовно') {
      onPriceChange(price);
    }
  }, [price, freeTickets, onPriceChange]);

  return (
    <div className="max-w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-8 pl-8">
      <span className="pb-4 text-2xl">Вартість квитків</span>
      <div className="pb-6">
        <button
          type="button"
          className={`${
            freeTickets ? 'bg-lightPurple text-gray-700' : 'bg-buttonPurple text-white'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => setFreeTickets(false)} 
        >
          Платні
        </button>
        <button
          type="button"
          className={`${
            freeTickets ? 'bg-buttonPurple text-white' : 'bg-lightPurple text-gray-700'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={() => setFreeTickets(true)} 
        >
          Безкоштовно
        </button>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-3">
            Ціна
          </label>
          <input
            id="price"
            type="number" 
            className={`outline-none border-2 w-[240px] h-[48px] my-[2px] mx-[2px] p-4 rounded-[10px] mr-4 [appearance:textfield]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${freeTickets ? 'border-[#D0D5D8]' : 'border-buttonPurple'}`}
            placeholder="100 ₴"
            onChange={handlePriceChange}
            disabled={freeTickets} 
            value={freeTickets ? '' : inputValue} 
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mb-3">
            Кількість квитків
          </label>
          <div className="relative">
            <HiOutlineTicket className="absolute top-[15.25px] left-[17.25px] w-6 h-6" />
            <input
              type="number"
              onChange={(e) => handleNumberOfTicketsChange(+e.target.value)}
              className="outline-none border-2 border-buttonPurple pl-[49px] w-[240px] h-[48px] my-[2px] mx-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
