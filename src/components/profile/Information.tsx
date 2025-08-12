import { useState } from 'react';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import WithdrawingMoneyPage from '@/components/profile/WithdrawingMoneyPage';

import { CropUploadImage } from './CropUploadImage';
import { ProfileForm } from './ProfileForm';
import WithdrawingMoney from './WithdrawingMoney';
import WithdrawingMoneyModal from './WithdrawingMoneyModal';

const Information = () => {
  const { name } = useAppSelector(selectUser);
  const [pageMoneyWithdraw, setPageMoneyWithdraw] = useState(false);
  const { isMobile } = useMediaVariables();

  const isFakeName = () => {
    return name.length === 0 ? 'гість' : name;
  };

  return (
    <div>
      <div className="lg:h-[192px] h-[150px] bg-bg-gradient rounded-[20px] lg:px-[32px] py-[21px] px-4 flex lg:gap-[48px] gap-[24px]">
        <CropUploadImage />
        <p
          className="font-oswald lg:text-[64px] text-[28px] inline-block"
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
      </div>
      {pageMoneyWithdraw &&
        (isMobile ? (
          <WithdrawingMoneyPage closePage={() => setPageMoneyWithdraw(false)} />
        ) : (
          <WithdrawingMoneyModal
            closePage={() => setPageMoneyWithdraw(false)}
          />
        ))}
      <WithdrawingMoney openPage={() => setPageMoneyWithdraw(true)} />
      <p className="lg:mb-[24px] mb-4 font-oswald lg:text-[24px] text-xl lg:font-medium font-normal">
        Контактна інформація
      </p>
      <ProfileForm />
    </div>
  );
};

export default Information;
