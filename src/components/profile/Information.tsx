import { useState } from 'react';

import {
  useGetBalanceQuery,
  useGetWithdrawBalanceQuery,
} from '@/redux/auth/authApi';
import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import WithdrawingMoneyPage from '@/components/profile/WithdrawingMoneyPage';

import Spinner from '../ui/Spinner';
import { CropUploadImage } from './CropUploadImage';
import { ProfileForm } from './ProfileForm';
import WithdrawingMoney from './WithdrawingMoney';
import WithdrawingMoneyModal from './WithdrawingMoneyModal';

const Information = () => {
  const { name, email } = useAppSelector(selectUser);
  const [pageMoneyWithdraw, setPageMoneyWithdraw] = useState(false);
  const { isMobile } = useMediaVariables();
  const { id } = useAppSelector(selectUser);
  const { data: balance, isLoading: isLoadingBalance } = useGetBalanceQuery(id);
  const { data: withdrawData, isLoading: isLoadingWithdraw } =
    useGetWithdrawBalanceQuery(id);

  const isFakeName = () => {
    return name.length === 0 ? 'гість' : name;
  };

  if (isLoadingBalance || isLoadingWithdraw) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="lg:h-[192px] h-[150px] bg-bg-gradient rounded-[20px] lg:px-[32px] py-[21px] px-4 flex lg:gap-[48px] gap-[24px]">
        <CropUploadImage />
        <div>
          <p
            className="font-oswald lg:text-[64px] text-[28px] inline-block w-full"
            style={{
              background:
                'linear-gradient(98.01deg, #12C2E9 2.11%, #C471ED 75.16%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Привіт, {isFakeName()}
          </p>
          <p className="text-sm text-textGray font-oswald w-full mt-3 truncate overflow-hidden">
            {email}
          </p>
        </div>
      </div>
      {pageMoneyWithdraw &&
        (isMobile ? (
          <WithdrawingMoneyPage
            closePage={() => setPageMoneyWithdraw(false)}
            balance={balance?.response}
          />
        ) : (
          <WithdrawingMoneyModal
            closePage={() => setPageMoneyWithdraw(false)}
            balance={balance?.response}
          />
        ))}
      <WithdrawingMoney
        openPage={() => setPageMoneyWithdraw(true)}
        balance={balance?.response}
        withdrawn={withdrawData?.response}
      />
      <p className="lg:mb-[24px] mb-4 font-oswald lg:text-[24px] text-xl lg:font-medium font-normal">
        Контактна інформація
      </p>
      <ProfileForm />
    </div>
  );
};

export default Information;
