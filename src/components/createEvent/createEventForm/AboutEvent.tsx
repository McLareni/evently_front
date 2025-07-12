import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiSmile } from 'react-icons/bi';

import { categories } from '@/assets/staticData/statickData';
import Picker, { EmojiClickData } from 'emoji-picker-react';

import MobileSectionHeader from './MobileSectionHeader';

type AboutEventProps = {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
};

const MAX_DESCRIPTION_LENGTH = 400;

const AboutEvent: React.FC<AboutEventProps> = ({
  control,
  setValue,
  watch,
  errors,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const { isDesktop, isMobile } = useMediaVariables();
  const [sectionIsOpen, setSectionIsOpen] = useState<boolean>(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (description.length < MAX_DESCRIPTION_LENGTH - 1) {
      setValue('description', description + emojiObject.emoji);
      setShowPicker(false);
    }
  };

  const handleCategoryClick = (categoryName: string, categotyValue: string) => {
    setValue('eventTypeName', categoryName);
    setValue('eventType', categotyValue);
  };

  const title = watch('title');
  const description = watch('description');
  const selectedCategory = watch('eventTypeName');

  return (
    <div
      onClick={() =>
        isMobile && !sectionIsOpen ? setSectionIsOpen(true) : () => {}
      }
      className={clsx(
        'relative lg:w-[760px] w-full rounded-[20px] lg:border-2 border border-buttonPurple flex flex-col p-3 lg:py-10 lg:px-10 lg:mb-8 mb-4 overflow-hidden',
        sectionIsOpen || isDesktop ? 'h-auto' : 'h-[56px]'
      )}
    >
      {isMobile && (
        <MobileSectionHeader
          text="Написати заголовок"
          isActive={sectionIsOpen}
          changeActiveSection={() => setSectionIsOpen(false)}
        />
      )}
      {!errors.title && !errors.description && title && description && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
      <div className="flex flex-col lg:pb-2 pb-0">
        <label className="lg:pb-3 pb-0 lg:text-2xl text-base" htmlFor="title">
          Назва події<span className="star">*</span>
        </label>
        {isMobile && (
          <p className="text-sm text-textGray my-[6px]">
            Назви подію так, щоб людям було одразу зрозуміло, про що вона
          </p>
        )}
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
            <div className="w-full h-12 lg:h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
              <input
                minLength={5}
                maxLength={100}
                type="text"
                id="title"
                className="focus:outline-none w-full h-full lg:p-4 px-2 py-3 rounded-[8px] lg:text-base text-sm"
                placeholder={
                  !isMobile
                    ? 'Назви подію так, щоб людям було одразу зрозуміло, про що вона'
                    : ''
                }
                {...field}
              />
            </div>
          )}
        />
        <div className="h-[20px]">
          {errors.title && (
            <p className="text-red-500 lg:text-sm text-xs">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:pb-[5px] pb-0 relative">
        <label
          className="lg:pb-4 pb-0 lg:text-2xl text-base"
          htmlFor="description"
        >
          Опис<span className="star">*</span>
        </label>
        {isMobile && (
          <p className="text-sm text-textGray my-[6px]">
            Коротко опиши ідею та концепцію події
          </p>
        )}
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
            <div className="relative w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                className="focus:outline-none w-full h-full lg:p-4 px-2 py-3 rounded-[8px] resize-none lg:text-base text-sm"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id="description"
                placeholder={
                  !isMobile ? 'Коротко опиши ідею та концепцію події' : ''
                }
                {...field}
              ></textarea>
              {!isMobile && (
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
        <div className="flex h-[20px]">
          {errors.description && (
            <p className="text-red-500 lg:text-sm text-xs">
              {errors.description.message}
            </p>
          )}

          <div className="ml-auto lg:text-sm text-xs text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
            {description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
          </div>
        </div>
        {showPicker && (
          <Picker style={{ width: '100%' }} onEmojiClick={onEmojiClick} />
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <span className="lg:pb-4 pb-0 lg:text-2xl text-base">
            Категорія<span className="star">*</span>
          </span>
          <Controller
            name="eventType"
            control={control}
            render={() => (
              <div className="flex break-words lg:w-[669px] w-full lg:h-[112px] h-auto flex-wrap">
                {categories.map(category => (
                  <div
                    key={category.name}
                    onClick={() =>
                      handleCategoryClick(category.name, category.value)
                    }
                    className={`${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[white]'
                        : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
                    } hover:from-[#12C2E9] hover:to-[#C471ED] transition ease-in-out duration-300 cursor-pointer flex items-center justify-center lg:rounded-[20px] rounded-[15px] border-[1px] border-borderColor 
                      lg:text-xl text-base lg:mr-4 mr-2 lg:h-12 h-[36px] lg:px-[18px] px-[16px] min-w-[80px] max-w-[230px] my-[6px]`}
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
