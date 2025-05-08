import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  loadNewEvent: (version: 'NEW' | 'OLD') => void;
}

const EditNavigate: React.FC<IProps> = ({ loadNewEvent }) => {
  const [newVersion, setNewVersion] = useState(false);

  return (
    <div className="flex items-center w-full justify-center gap-6 mt-6">
      <button
        className="focus:outline-0 disabled:opacity-40"
        disabled={!newVersion}
        onClick={() => {
          setNewVersion(false);
          loadNewEvent('OLD');
        }}
      >
        <BiChevronDown className="rotate-90 w-12 h-12 bg-gray rounded-full" />
      </button>
      <h2 className="font-lato text-base font-bold w-[164px] text-center">
        {newVersion ? 'Відредагована подія' : 'Поточна подія'}
      </h2>
      <button
        className="focus:outline-0 disabled:opacity-40"
        disabled={newVersion}
        onClick={() => {
          setNewVersion(true);
          loadNewEvent('NEW');
        }}
      >
        <BiChevronDown className="-rotate-90 w-12 h-12 bg-gray rounded-full" />
      </button>
    </div>
  );
};

export default EditNavigate;
