import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

import {
  useChangeStatusUserMutation,
  useDeleteUserMutation,
} from '@/redux/admin/userApi';

import { SORT_USER_TYPE } from '@/pages/admin/AdminUsers';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

import Spinner from '../ui/Spinner';
import ModalAdmin from './ModalAdmin';
import UserCard from './UserCard';

export const SORT_USER = [
  'name',
  'phoneNumber',
  'email',
  'creationDate',
  'role',
  'status',
] as SORT_USER_TYPE[];

interface IProps {
  data: User[] | [];
  from: number;
  cols: SORT_USER_TYPE[];

  activeSort: { col: SORT_USER_TYPE; direction: boolean };
  // eslint-disable-next-line no-unused-vars
  changeSort: (col: SORT_USER_TYPE, direction: boolean) => void;
}

const AdminTable: React.FC<IProps> = ({
  data,
  from,
  cols,
  activeSort,
  changeSort,
}) => {
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
    setSelectedUser(data[id]);
    setOpenPopUp(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClosePopUp = (event: any) => {
    if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
      return;
    }

    setOpenPopUp(undefined);
  };

  const handleOpenModal = (variant: 'status' | 'delete', user: User) => {
    setSelectedUser(user);
    if (variant === 'delete') {
      setConfirmationDelete(true);
    } else {
      setConfirmationChangeStatus(true);
    }
  };

  return (
    <>
      <table
        className="rounded border border-buttonPurple border-separate border-spacing-0 w-full h-full table-fixed"
        onClick={event => handleClosePopUp(event)}
      >
        <thead>
          <tr className="h-[58px]">
            {cols.map((col, index) => (
              <th
                key={col}
                onClick={() =>
                  changeSort(
                    SORT_USER[index],

                    !(
                      activeSort.col === SORT_USER[index] &&
                      activeSort.direction
                    )
                  )
                }
                className={clsx(
                  'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text text-wrap max-w-[135px] min-w-[90px] hover:cursor-pointer'
                )}
              >
                <p className="relative pr-6">
                  {col}

                  <BsFilter
                    className={clsx(
                      'w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2 ',
                      {
                        'rotate-180 fill-buttonPurple':
                          SORT_USER[index] === activeSort?.col &&
                          activeSort.direction,
                        'rotate-0 fill-buttonPurple':
                          SORT_USER[index] === activeSort?.col &&
                          !activeSort.direction,
                      }
                    )}
                  />
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
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
