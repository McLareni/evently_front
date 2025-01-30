/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiSmile } from 'react-icons/bi';

import Picker, { EmojiClickData } from 'emoji-picker-react';

type AboutOrganizerProps = {
  handleAboutOrganizerChange: (aboutOrganizer: string) => void;
};

interface IFormInput {
  title: string;
  description: string;
}
const MAX_DESCRIPTION_LENGTH = 400;

const AboutOrganizer: React.FC<AboutOrganizerProps> = ({
  handleAboutOrganizerChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [aboutOrganizer, setAboutOrganizer] = useState('');

  const {
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (aboutOrganizer.length < MAX_DESCRIPTION_LENGTH - 1) {
      setAboutOrganizer(prevInput => prevInput + emojiObject.emoji);
      setShowPicker(false);
    }
  };

  useEffect(() => {
    handleAboutOrganizerChange(aboutOrganizer);
  }, [aboutOrganizer, handleAboutOrganizerChange]);

  return (
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10">
      <div className="flex flex-col pb-[25px] relative">
        <label htmlFor="" className="pb-4 text-2xl">
          Про організатора<span className="star">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Опис обов'язковий" }}
          render={({ field }) => (
            <textarea
              className="focus:outline-none w-[679px] h-[128px] p-4 border-2 rounded-[10px] border-buttonPurple"
              maxLength={MAX_DESCRIPTION_LENGTH}
              id=""
              placeholder="Розкажіть про себе"
              value={aboutOrganizer}
              onChange={e => {
                setAboutOrganizer(e.target.value);
                field.onChange(e);
              }}
            ></textarea>
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <div className="text-right text-sm text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
          {aboutOrganizer.length}/{MAX_DESCRIPTION_LENGTH}
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
