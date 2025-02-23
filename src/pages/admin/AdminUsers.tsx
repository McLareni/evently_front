import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineRefresh } from 'react-icons/md';

import { useGetAdminUserQuery } from '@/redux/admin/userApi';

import AdminTable, { SORT_USER } from '@/components/admin/AdminTable';
import Navigation from '@/components/admin/Navigation';
import Spinner from '@/components/ui/Spinner';

export type SORT_USER_TYPE =
  | 'name'
  | 'phoneNumber'
  | 'email'
  | 'creationDate'
  | 'status'
  | 'role';

const AdminUsers = () => {
  const { t } = useTranslation('adminUser');
  const cols = t('colTable', { returnObjects: true }) as SORT_USER_TYPE[];
  const [page, setPage] = useState<number>(1);
  const [quantityUsers, setQuanitityUsers] = useState<number>(20);
  const [sort, setSort] = useState<{ col: SORT_USER_TYPE; direction: boolean }>(
    { col: SORT_USER[3], direction: false }
  );

  const { data, isFetching, refetch } = useGetAdminUserQuery({
    page,
    size: quantityUsers,
    col: sort.col,
    direction: sort.direction ? 'asc' : 'desc',
  });

  const { content: users, page: pageInfo } = data || { content: [], page: {} };

  const totalUser = pageInfo?.totalElements || 0;
  const minUserPage = quantityUsers * (page - 1) + 1;
  const maxUserPage =
    page * quantityUsers > totalUser ? totalUser : page * quantityUsers;

  const handleGetUsers = async () => {
    if (!isFetching) {
      refetch();
    }
  };

  const handleChangeSort = (col: SORT_USER_TYPE, direction: boolean) => {
    console.log(col, direction);

    setSort({ col, direction });
  };

  const handleChangePage = (direction: 'up' | 'down') => {
    setPage(currPage => {
      if (direction === 'up') {
        const maxPage = totalUser / quantityUsers;
        return currPage >= maxPage ? currPage : currPage + 1;
      } else {
        return currPage > 1 ? currPage - 1 : 1;
      }
    });
  };

  const handleChangeQuantitty = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuanitityUsers(+event?.target.value);
    setPage(1);
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main>
      <button
        onClick={handleGetUsers}
        className="flex gap-1 text-textDark text-xs leading-6 font-lato focus:outline-0 mb-[15px]"
      >
        <MdOutlineRefresh className="w-6 h-6" />
        {t('refresh')}
      </button>
      <div>
        <AdminTable
          cols={cols}
          changeSort={handleChangeSort}
          data={users || []}
          activeSort={sort}
          from={minUserPage - 1}
        ></AdminTable>
      </div>
      <div className="flex items-center justify-end mt-[13px] text-xs font-lato text-textDark">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px] text-xs">
          {minUserPage}-{maxUserPage} з {totalUser}
        </p>
        <p className="mr-4">Кількість користувачів</p>
        <Navigation page={page} changePage={handleChangePage} />
        <select
          className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background px-1 py-[3px] mr-2"
          onChange={handleChangeQuantitty}
          defaultValue={quantityUsers}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <p>Елементів на сторінці</p>
      </div>
    </main>
  );
};

export default AdminUsers;
