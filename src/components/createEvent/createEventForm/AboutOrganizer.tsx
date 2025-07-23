import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle, AiOutlineExclamation } from 'react-icons/ai';
import { BiSmile } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { formatPhoneToMask } from '@/helpers/userForm/formatToMask';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import { useMask } from '@react-input/mask';
import clsx from 'clsx';
import Picker, { EmojiClickData } from 'emoji-picker-react';

import MobileSectionHeader from './MobileSectionHeader';

type AboutOrganizerProps = {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  agreement: boolean;
  checkAgreement: () => void;
};

const MAX_DESCRIPTION_LENGTH = 400;

const AboutOrganizer: React.FC<AboutOrganizerProps> = ({
  control,
  setValue,
  watch,
  errors,
  agreement,
  checkAgreement,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [shownTooltip, setShownTooltip] = useState(false);
  const { isDesktop, isMobile } = useMediaVariables();
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

  const showTooltip = () => {
    setShownTooltip(true);
  };

  const hideTooltip = () => {
    setShownTooltip(false);
  };

  const user = useAppSelector(selectUser);

  const phoneInputRef = useMask({
    mask: '+38(___)___-__-__',
    replacement: { _: /\d/ },
  });

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (aboutOrganizer.length < MAX_DESCRIPTION_LENGTH - 1) {
      setValue('aboutOrganizer', aboutOrganizer + emojiObject.emoji);
      setShowPicker(false);
    }
  };

  const aboutOrganizer = watch('aboutOrganizer');
  const phoneNumber = watch('phoneNumber');

  useEffect(() => {
    if (user.phoneNumber) {
      setValue('phoneNumber', formatPhoneToMask(user.phoneNumber));
    }
  }, [setValue, user.phoneNumber]);

  const dataIsValid = !!(!errors.phoneNumber && phoneNumber && agreement);

  return (
    <div
      onClick={() =>
        isMobile && !sectionIsOpen ? setSectionIsOpen(true) : () => {}
      }
      className={clsx(
        'relative lg:w-[760px] w-full rounded-[20px] lg:border-2 border border-buttonPurple flex flex-col p-3 lg:py-10 lg:px-10 overflow-hidden',
        sectionIsOpen || isDesktop ? 'h-auto' : 'h-[56px]'
      )}
    >
      {isMobile && (
        <MobileSectionHeader
          text="Про організатора"
          isActive={sectionIsOpen}
          changeActiveSection={() => setSectionIsOpen(false)}
          dataIsValid={dataIsValid}
        />
      )}
      {dataIsValid && isDesktop && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      <div className="flex flex-col relative">
        <label
          htmlFor="aboutOrganizer"
          className="lg:pb-4 pb-0 lg:text-2xl text-base"
        >
          Про організатора
        </label>
        {isMobile && (
          <p className="text-sm text-textGray my-[6px]">
            Додай кілька слів про себе – це підвищить довіру.
          </p>
        )}
        <Controller
          name="aboutOrganizer"
          control={control}
          render={({ field }) => (
            <div className="relative w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                {...field}
                className="focus:outline-none w-full h-full lg:p-4 px-2 py-3 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="aboutOrganizer"
                placeholder={
                  !isMobile
                    ? 'Додай кілька слів про себе – це підвищить довіру.'
                    : ''
                }
              ></textarea>
              {isDesktop && (
                <button
                  className="absolute right-[16px] bottom-[16px] focus:outline-none"
                  type="button"
                  onClick={() => setShowPicker(val => !val)}
                >
                  <BiSmile size={24} />
                </button>
              )}
            </div>
          )}
        />
        <div className="text-right text-sm text-gray-500 mt-0.5 h-[20px] text-uploadBtnBg">
          {aboutOrganizer?.length || 0}/{MAX_DESCRIPTION_LENGTH}
        </div>
      </div>
      {showPicker && (
        <Picker style={{ width: '100%' }} onEmojiClick={onEmojiClick} />
      )}

      <div className="flex flex-col lg:pb-2 pb-0">
        <div className="lg:pb-3 pb-0 text-2xl flex relative">
          <label htmlFor="phoneNumber" className="flex items-center gap-4">
            <span className="lg:pb-4 pb-0 lg:text-2xl text-base">
              Номер телефону<span className="star">*</span>
            </span>
            {isDesktop && (
              <div
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                className="flex justify-center items-center border-[#ff0f00] border-2 rounded-full w-[24px] h-[24px]"
              >
                <AiOutlineExclamation color="#ff0f00" size={14} />
              </div>
            )}

            {shownTooltip && (
              <div className="absolute left-[250px]">
                <div className="relative w-[230px]">
                  <img
                    src="/images/phone-number-tooltip.svg"
                    width={170}
                    height={90}
                  />
                  <p className="leading-[1.5] text-[12px] absolute left-6 top-[6px]">
                    Ваш номер бачить лише
                    <br />
                    адміністратор для зв’язку
                    <br />
                    за потреби
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
        {isMobile && (
          <p className="text-sm text-textGray my-[6px]">
            Ваш номер бачить лише адміністратор для звʼязку за потреби
          </p>
        )}
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Номер обов'язковий",
            validate: value => {
              if (value.length !== 17 && value.length > 0)
                return 'Введи номер телефону';

              if (value.length === 17) {
                if (value[4] !== '0' || value[5] === '0') {
                  return 'Введи дійсний код українських операторів';
                }
                if (value.includes('000-00-00')) {
                  return 'Введи правильний номер телефону';
                }
              }
            },
          }}
          render={({ field }) => (
            <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
              <input
                {...field}
                ref={phoneInputRef}
                type="text"
                id="title"
                className="focus:outline-none w-full h-full p-4 rounded-[8px]"
                placeholder="+38(099)999-99-99"
              />
            </div>
          )}
        />
        <div className="h-[20px]">
          {errors.phoneNumber && (
            <p className="text-red-500 lg:text-sm text-xs">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      <label className="flex items-center cursor-pointer mb-[12px] lg:text-base text-sm">
        <input
          id="unlimitedTickets"
          type="checkbox"
          className="appearance-none absolute opacity-0 pointer-events-none"
          checked={agreement}
          onChange={checkAgreement}
        />
        <div className="min-h-6 min-w-6 h-6 w-6 flex items-center justify-center bg-lightPink rounded-[5px]">
          {agreement && <MdDone className="text-black w-6 h-6" />}
        </div>
        <span className="ml-2">
          Я погоджуюсь із{' '}
          <a
            className="underline text-buttonPurple"
            href="/Правила.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Політикою конфіденційності
          </a>{' '}
          та{' '}
          <a
            className="underline text-buttonPurple"
            href="/Правила.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Умовами використання
          </a>
          .
        </span>
      </label>
    </div>
  );
};

export default AboutOrganizer;
