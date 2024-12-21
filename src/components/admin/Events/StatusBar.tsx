import { FilterStatus } from '@/pages/admin/AdminEvents';
import clsx from 'clsx';

interface IProps {
  activeStatus: FilterStatus;
  // eslint-disable-next-line no-unused-vars
  changeStatus: (status: FilterStatus) => void;
  countStatusEvent: {
    CANCELLED: number;
    PENDING: number;
    APPROVED: number;
  };
}

const StatusBar: React.FC<IProps> = ({
  activeStatus,
  changeStatus,
  countStatusEvent,
}) => {
  return (
    <div className="bg-lightBlue rounded-[15px] p-2 mb-[15px] w-full">
      <ul className="text-2xl text-textDark flex justify-around">
        <li
          onClick={() => changeStatus('PENDING')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple hover:cursor-pointer',
            {
              'bg-buttonPurple border-buttonPurple text-white':
                activeStatus === 'PENDING',
            }
          )}
        >
          <h2 className={clsx({ 'text-white': activeStatus === 'PENDING' })}>
            Очікують ({countStatusEvent.PENDING})
          </h2>
        </li>
        <li
          onClick={() => changeStatus('APPROVED')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple hover:cursor-pointer',
            {
              'bg-buttonPurple border-buttonPurple':
                activeStatus === 'APPROVED',
            }
          )}
        >
          <h2 className={clsx({ 'text-white': activeStatus === 'APPROVED' })}>
            Схвалено ({countStatusEvent.APPROVED})
          </h2>
        </li>
        <li
          onClick={() => changeStatus('CANCELLED')}
          className={clsx(
            'w-[224px] h-12 rounded-[18px] flex justify-center items-center font-medium border-2 border-transparent hover:border-buttonPurple hover:cursor-pointer',
            {
              'bg-buttonPurple border-buttonPurple text-white':
                activeStatus === 'CANCELLED',
            }
          )}
        >
          <h2 className={clsx({ 'text-white': activeStatus === 'CANCELLED' })}>
            Відхилено ({countStatusEvent.CANCELLED})
          </h2>
        </li>
      </ul>
    </div>
  );
};

export default StatusBar;
