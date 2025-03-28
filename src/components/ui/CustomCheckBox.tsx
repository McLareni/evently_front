import { useState } from 'react';
import { MdDone } from 'react-icons/md';

interface CustomCheckboxProps {
  checked?: boolean;
  label: string;
  className: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: boolean | string) => void;
  value?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        className="appearance-none"
      />
      <div
        className={` h-5 w-5 flex items-center justify-center bg-white ${className}`}
      >
        {isChecked && <MdDone className="text-black w-6 h-6 " />}{' '}
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};
