/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiSmile } from 'react-icons/bi';

import { categories } from '@/assets/staticData/statickData';
import Picker, { EmojiClickData } from 'emoji-picker-react';

type AboutEventProps = {
  control: any;
  setValue: (name: string, value: string) => void;
  watch: (name: string) => string;
  errors: any;
};

const MAX_DESCRIPTION_LENGTH = 400;

const AboutEvent: React.FC<AboutEventProps> = ({
  control,
  setValue,
  watch,
  errors,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (description.length < MAX_DESCRIPTION_LENGTH - 1) {
      setValue('description', description + emojiObject.emoji);
      setShowPicker(false);
    }
  };

  const handleCategoryClick = (categoryName: string, categotyValue: string) => {
    setValue('eventType.name', categoryName);
    setValue('eventType.value', categotyValue);
  };

  const title = watch('title');
  const description = watch('description');
  const selectedCategory = watch('eventType.name');

  return (
    <div className="relative w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10 mb-8">
      {!errors.title && !errors.description && title && description && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      <div className="flex flex-col pb-2">
        <label className="pb-3 text-2xl" htmlFor="title">
          Назва події<span className="star">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Назва обов'язкова",
            validate: {
              minLength: value =>
                value.trim().length >= 5 || 'Мінімум 5 символів',
            },
          }}
          render={({ field }) => (
            <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
              <input
                minLength={5}
                maxLength={100}
                type="text"
                id="title"
                className="focus:outline-none w-full h-full p-4 rounded-[8px]"
                placeholder="Назви подію так, щоб людям було одразу зрозуміло, про що вона"
                {...field}
              />
            </div>
          )}
        />
        <div className="h-[20px]">
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col pb-[5px] relative">
        <label className="pb-4 text-2xl" htmlFor="description">
          Опис<span className="star">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Опис обов'язковий",
            validate: {
              minLength: value =>
                value.trim().length >= 20 || 'Мінімум 20 символів',
            },
          }}
          render={({ field }) => (
            <div className="w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                className="focus:outline-none w-full h-full p-4 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="description"
                placeholder="Коротко опиши ідею та концепцію події"
                {...field}
              ></textarea>
            </div>
          )}
        />
        <div className="flex h-[20px]">
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
          <div className="ml-auto text-sm text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
            {description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
          </div>
          <button type="button" onClick={() => setShowPicker(val => !val)}>
            <BiSmile
              size={24}
              className="absolute right-[16px] bottom-[40px]"
            />
          </button>
        </div>
        {showPicker && (
          <Picker style={{ width: '100%' }} onEmojiClick={onEmojiClick} />
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <span className="pb-4 text-2xl">
            Категорія<span className="star">*</span>
          </span>
          <Controller
            name="eventType"
            control={control}
            render={() => (
              <div className="flex break-words w-[669px] h-[112px] flex-wrap">
                {categories.map(category => (
                  <div
                    key={category.name}
                    onClick={() =>
                      handleCategoryClick(category.name, category.value)
                    }
                    className={`${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED]'
                        : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
                    } hover:from-[#12C2E9] hover:to-[#C471ED] transition ease-in-out duration-700 cursor-pointer flex items-center rounded-[20px] border-[1px] border-borderColor text-xl mr-4 last:pr-0 h-12 px-[18px] min-w-[80px] max-w-[230px]`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default AboutEvent;
