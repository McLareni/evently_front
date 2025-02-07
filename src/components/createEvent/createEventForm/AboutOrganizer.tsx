/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { BiSmile } from 'react-icons/bi';

import Picker, { EmojiClickData } from 'emoji-picker-react';

type AboutOrganizerProps = {
  control: any;
  setValue: (name: string, value: string) => void;
  watch: (name: string) => string;
};

const MAX_DESCRIPTION_LENGTH = 400;

const AboutOrganizer: React.FC<AboutOrganizerProps> = ({
  control,
  setValue,
  watch,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (aboutOrganizer.length < MAX_DESCRIPTION_LENGTH - 1) {
      setValue('aboutOrganizer', aboutOrganizer + emojiObject.emoji);
      setShowPicker(false);
    }
  };

  const aboutOrganizer = watch('aboutOrganizer');

  return (
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10">
      <div className="flex flex-col pb-[25px] relative">
        <label htmlFor="" className="pb-4 text-2xl">
          Про організатора
        </label>
        <Controller
          name="aboutOrganizer"
          control={control}
          render={({ field }) => (
            <div className="w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                className="focus:outline-none w-full h-full p-4 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="aboutOrganizer"
                placeholder="Розкажіть про себе"
                {...field}
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
