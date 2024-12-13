import { FilterStatus } from '@/pages/admin/AdminEvents';
import clsx from 'clsx';

interface IProps {
  activeStatus: FilterStatus;
  // eslint-disable-next-line no-unused-vars
  changeStatus: (status: FilterStatus) => void;
}

const StatusBar: React.FC<IProps> = ({ activeStatus, changeStatus }) => {
  return (
    <div className="bg-lightBlue rounded-[15px] p-2 mb-[15px] w-full">
      <ul className="text-2xl text-textDark flex justify-around">
        <li
          onClick={() => changeStatus('expect')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple',
            {
              'bg-buttonPurple border-buttonPurple text-white':
                activeStatus === 'expect',
            }
          )}
        >
          <h2 className={clsx({'text-white' : activeStatus === 'expect'})}>Очікують (15)</h2>
        </li>
        <li
          onClick={() => changeStatus('approved')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple',
            {
              'bg-buttonPurple border-buttonPurple':
                activeStatus === 'approved',
            }
          )}
        >
          <h2 className={clsx({'text-white' : activeStatus === 'approved'})}>Схвалено (0)</h2>
        </li>
        <li
          onClick={() => changeStatus('rejected')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple',
            {
              'bg-buttonPurple border-buttonPurple text-white':
                activeStatus === 'rejected',
            }
          )}
        >
          <h2 className={clsx({'text-white' : activeStatus === 'rejected'})}>Відхилено (10)</h2>
        </li>
      </ul>
    </div>
  );
};

export default StatusBar;
