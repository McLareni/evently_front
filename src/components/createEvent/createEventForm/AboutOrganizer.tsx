import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiSmile } from 'react-icons/bi';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { formatPhoneToMask } from '@/helpers/userForm/formatToMask';
import { useMask } from '@react-input/mask';
import Picker, { EmojiClickData } from 'emoji-picker-react';

type AboutOrganizerProps = {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
};

const MAX_DESCRIPTION_LENGTH = 400;

const AboutOrganizer: React.FC<AboutOrganizerProps> = ({
  control,
  setValue,
  watch,
  errors,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tipShown, setTipShown] = useState(false);

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

  const onTipHover = () => {
    setTipShown(!tipShown);
  };

  const aboutOrganizer = watch('aboutOrganizer');
  const phoneNumber = watch('phoneNumber');

  useEffect(() => {
    if (user.phoneNumber) {
      setValue('phoneNumber', formatPhoneToMask(user.phoneNumber));
    }
  }, [setValue, user.phoneNumber]);

  return (
    <div className="relative w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10">
      {!errors.phoneNumber && phoneNumber && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      <div className="flex flex-col relative">
        <label htmlFor="aboutOrganizer" className="pb-4 text-2xl">
          Про організатора
        </label>
        <Controller
          name="aboutOrganizer"
          control={control}
          render={({ field }) => (
            <div className="relative w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                {...field}
                className="focus:outline-none w-full h-full p-4 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="aboutOrganizer"
                placeholder="Розкажи про себе"
              ></textarea>
              <button
                className="absolute right-[16px] bottom-[16px] focus:outline-none"
                type="button"
                onClick={() => setShowPicker(val => !val)}
              >
                <BiSmile size={24} />
              </button>
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

      <div className="flex flex-col pb-2">
        <div className="pb-3 text-2xl flex">
          <label htmlFor="title">
            Номер телефону<span className="star">*</span>
          </label>
          <div
            className="relative"
            onMouseEnter={onTipHover}
            onMouseLeave={onTipHover}
          >
            i
            {tipShown && (
              <div className="absolute top-0 left-2 bg-[white] p-2 border-2 border-[red] rounded-lg">
                тратата
              </div>
            )}
          </div>
        </div>
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
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutOrganizer;
