import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const EditNavigate: React.FC = () => {
  const [newVersion, setNewVersion] = useState(false);

  return (
    <div className="flex items-center w-full justify-center gap-6 mt-6">
      <button
        className="focus:outline-0 disabled:opacity-40"
        disabled={!newVersion}
        onClick={() => setNewVersion(false)}
      >
        <BiChevronDown className="rotate-90 w-12 h-12 bg-gray rounded-full" />
      </button>
      <h2 className="font-lato text-base font-bold w-[164px] text-center">
        {newVersion ? 'Відредагована подія' : 'Поточна подія'}
      </h2>
      <button
        className="focus:outline-0 disabled:opacity-40"
        disabled={newVersion}
        onClick={() => setNewVersion(true)}
      >
        <BiChevronDown className="-rotate-90 w-12 h-12 bg-gray rounded-full" />
      </button>
    </div>
  );
};

export default EditNavigate;
