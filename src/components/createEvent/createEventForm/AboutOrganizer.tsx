import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BiSmile } from 'react-icons/bi';

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

  return (
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10">
      <div className="flex flex-col pb-2">
        <label className="pb-3 text-2xl" htmlFor="title">
          Номер телефону<span className="star">*</span>
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Номер обов'язковий",
            validate: value => {
              if (value.length !== 17 && value.length > 0)
                return 'Введіть номер телефону';

              if (value.length === 17) {
                if (value[4] !== '0' || value[5] === '0') {
                  return 'Введіть дійсний код українських операторів';
                }
                if (value.includes('000-00-00')) {
                  return 'Введіть правильний номер телефону';
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

      <div className="flex flex-col pb-[25px] relative">
        <label htmlFor="aboutOrganizer" className="pb-4 text-2xl">
          Про організатора
        </label>
        <Controller
          name="aboutOrganizer"
          control={control}
          render={({ field }) => (
            <div className="w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                {...field}
                className="focus:outline-none w-full h-full p-4 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="aboutOrganizer"
                placeholder="Розкажіть про себе"
              ></textarea>
            </div>
          )}
        />
        <div className="text-right text-sm text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
          {aboutOrganizer?.length || 0}/{MAX_DESCRIPTION_LENGTH}
        </div>
        <button type="button" onClick={() => setShowPicker(val => !val)}>
          <BiSmile size={24} className="absolute right-[16px] bottom-[60px]" />
        </button>
      </div>
      {showPicker && (
        <Picker style={{ width: '100%' }} onEmojiClick={onEmojiClick} />
      )}
    </div>
  );
};

export default AboutOrganizer;
