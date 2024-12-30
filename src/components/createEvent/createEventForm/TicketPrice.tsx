import { useEffect, useState } from "react";
import { HiOutlineTicket } from "react-icons/hi";

type TicketPriceProps = {
    price: string,
    onPriceChange: (price: string) => void;
}


const TicketPrice: React.FC<TicketPriceProps> = ({price, onPriceChange}) => {
    const [ticketsType, setTicketsType] = useState<boolean>(false);
    useEffect(() => {
        if (price === '') {
          onPriceChange('Ціна');
        }
      }, [price, onPriceChange]);
    return (
        <div className="w-[760px] h-[265px] rounded-[20px] border-2 border-buttonPurple flex flex-col p-8 pb-[32px]">
        <span className="pb-4 text-2xl">Вартість квитків</span>
        <div className="pb-6 ">
          <button
            className={`${
              ticketsType
                ? 'bg-lightPurple text-gray-700'
                : 'bg-buttonPurple text-white'
            }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
            onClick={() => setTicketsType(false)}
          >
            Платні
          </button>
          <button
            className={`${
              ticketsType
                ? 'bg-buttonPurple text-white'
                : 'bg-lightPurple text-gray-700'
            }font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
            onClick={() => setTicketsType(true)}
          >
            Безкоштовно
          </button>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="price" id="" className="mb-3">
              Ціна
            </label>
            {/* <div className="bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] h-[52px] w-[244px] rounded-[12px] mr-4"> */}
              <input
                id="price"
                type="number"
                className={`border-2 border-buttonPurple w-[240px] h-[48px] my-[2px] mx-[2px] p-4  rounded-[10px] mr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${ticketsType ? '' : 'border-gray-100'}`}
                placeholder="100 ₴"
                onChange={e => onPriceChange(e.target.value)}
              />
            {/* </div> */}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" id="" className="mb-3">
              Кількість квитків
            </label>
            <div className="relative">
              <HiOutlineTicket className="absolute top-[15.25px] left-[17.25px] w-6 h-6" />
              <div className="bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] h-[52px] w-[244px] rounded-[12px] mr-4">
                <input
                  type="number"
                  className="pl-[49px] w-[240px] h-[48px] my-[2px] mx-[2px] p-4 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="100"
                  // onChange={(e) => onPriceChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TicketPrice