import React from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

interface IProps {
  refresh: () => void;
}

const TableHead: React.FC<IProps> = ({ refresh }) => {
  return (
    <thead className="after:absolute after:top-0 after:z-[-1] after:w-full after:h-[65px] after:bg-lightBlue after:rounded-[20px] bg-transparent h-[65px] z-10 relative">
      <tr className="text-2xl font-oswald">
        <th className="w-min"></th>
        <th className="font-medium text-center">Подія</th>
        <th></th>
        <th className="font-medium text-start">Ціна</th>
        <th className="font-medium text-start">Придбано</th>
        <th className="font-medium text-start">Прибуток</th>
        <th>
          <div className="flex items-center justify-between pr-[18px] z-50">
            Статус
            <button onClick={refresh} className="focus:outline-0">
              <MdOutlineRefresh className="h-8 w-8 hover:fill-buttonPurple" />
            </button>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
