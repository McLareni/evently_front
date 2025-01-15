/* eslint-disable no-unused-vars */
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TfiLock } from 'react-icons/tfi';
import { VscKey } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import CellItem from './CellTable';

interface IProps {
  item: User;
  index: number;
  idPopUp?: number;
  openPopUp: (id: number) => void;
  openModal: (variant: 'delete' | 'status', user: User) => void;
}

const role = {
  ADMIN: 'Aдмін',
  VISITOR: 'Відвідувач',
  ORGANIZER: 'Організатор',
};

const UserCard: React.FC<IProps> = ({ item, index, openModal }) => {
  const formatedDate = item.creationDate
    ? new Date(item.creationDate).toLocaleDateString('uk-UA')
    : 'Не вказанно';

  return (
    <tr key={item.email} className="relative">
      <CellItem>
        <Link to={`/admin/profile/${item.id}`} className="flex relative">
          <span className="w-11/12 text-nowrap text-ellipsis overflow-hidden">
            {index + 1}. <span className="underline">{item.name}</span>
          </span>
          {item.status === 'BANNED' && (
            <TfiLock className="fill-lightRed w-3 h-3 absolute -translate-y-1/2 top-1/2 right-0" />
          )}
        </Link>
      </CellItem>
      <CellItem>{item.phoneNumber || 'Не вказано'}</CellItem>
      <CellItem>{item.email}</CellItem>
      <CellItem>{formatedDate}</CellItem>
      <CellItem classes="text-center">
        {item.role ? role[item.role] : 'Не вказанно'}
      </CellItem>
      <CellItem classes="flex justify-evenly">
        <>
          {item.status === 'BANNED' ? (
            <VscKey
              onClick={() => openModal('status', item)}
              className="w-6 h-6 fill-success hover:cursor-pointer"
            />
          ) : (
            <TfiLock
              onClick={() => openModal('status', item)}
              className="w-6 h-6 fill-error hover:cursor-pointer"
            />
          )}

          <RiDeleteBin5Line
            onClick={() => openModal('delete', item)}
            className="w-6 h-6 hover:cursor-pointer"
          />
        </>
      </CellItem>
    </tr>
  );
};

export default UserCard;
