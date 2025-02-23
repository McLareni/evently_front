import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

import {
  useChangeStatusUserMutation,
  useDeleteUserMutation,
} from '@/redux/admin/userApi';

import sortUser from '@/utils/sortUser';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

import Spinner from '../ui/Spinner';
import ModalAdmin from './ModalAdmin';
import UserCard from './UserCard';

interface IProps {
  cols: string[];
  data: User[] | [];
  from: number;
}

const AdminTable: React.FC<IProps> = ({ cols, data, from }) => {
  const [sort, setSort] = useState<
    { col: string; direction: boolean } | undefined
  >({ col: cols[3], direction: false });
  const [openPopUp, setOpenPopUp] = useState<number | undefined>(undefined);
  const [confirmationDelete, setConfirmationDelete] = useState<boolean>(false);
  const [confirmationChangeStatus, setConfirmationChangeStatus] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const [deleteUserFn, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const [changeStatusUserFn, { isLoading: changeUserLoading }] =
    useChangeStatusUserMutation();

  const deleteUser = async () => {
    const response = await deleteUserFn(selectedUser?.id || '');
    if (response.data?.status === 200) {
      setOpenPopUp(undefined);
      setConfirmationDelete(false);
    }
  };

  const changeStatusUser = async () => {
    let email = selectedUser?.email || '';

    const response = await changeStatusUserFn({
      isBan: selectedUser?.status === 'ACTIVE',
      email,
      id: selectedUser?.id || '',
    });

    if (response.data?.status === 200) {
      setOpenPopUp(undefined);
      setConfirmationChangeStatus(false);
    }
  };

  const handlePopUp = (id: number) => {
    setSelectedUser(sortedData[id]);
    setOpenPopUp(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClosePopUp = (event: any) => {
    if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
      return;
    }

    setOpenPopUp(undefined);
  };

  const handleChangeSort = (col: string) => {
    setSort(prevState => {
      const currState = { ...prevState };
      if (currState.col !== col) {
        return { col, direction: true };
      } else {
        return { col, direction: !currState.direction };
      }
    });
  };

  const handleOpenModal = (variant: 'status' | 'delete', user: User) => {
    setSelectedUser(user);
    if (variant === 'delete') {
      setConfirmationDelete(true);
    } else {
      setConfirmationChangeStatus(true);
    }
  };

  let sortedData = [...data];
  if (sort) {
    sortedData = sortUser(sort, cols, data);
  }

  return (
    <>
      <table
        className="rounded border border-buttonPurple border-separate border-spacing-0 w-full h-full table-fixed"
        onClick={event => handleClosePopUp(event)}
      >
        <thead>
          <tr className="h-[58px]">
            {cols.map(col => (
              <th
                key={col}
                onClick={() => handleChangeSort(col)}
                className={clsx(
                  'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text-top text-wrap max-w-[135px] min-w-[90px] hover:cursor-pointer'
                )}
              >
                <p className="relative pr-6">
                  {col}

                  <BsFilter
                    className={clsx(
                      'w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2 ',
                      {
                        'rotate-180 fill-buttonPurple':
                          col === sort?.col && sort.direction,
                        'rotate-0 fill-buttonPurple':
                          col === sort?.col && !sort.direction,
                      }
                    )}
                  />
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <UserCard
              key={nanoid()}
              item={item}
              index={index + from}
              idPopUp={openPopUp}
              openPopUp={handlePopUp}
              openModal={handleOpenModal}
            />
          ))}
        </tbody>
      </table>
      <ModalAdmin
        text="Ви точно хочете видалити цього користувача?"
        isOpen={confirmationDelete}
        onClose={() => setConfirmationDelete(false)}
        clickYes={deleteUser}
      />
      <ModalAdmin
        text="Ви точно хочете змінити статус цього користувача?"
        isOpen={confirmationChangeStatus}
        onClose={() => setConfirmationChangeStatus(false)}
        clickYes={changeStatusUser}
      />
      {(deleteUserLoading || changeUserLoading) && <Spinner />}
    </>
  );
};

export default AdminTable;
