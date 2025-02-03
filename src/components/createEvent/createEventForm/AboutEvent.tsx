/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { categories } from '@/assets/staticData/statickData';

type AboutEventProps = {
  description: string;
  onEventNameChange: (eventName: string) => void;
  onDescriptionChange: (eventDescription: string) => void;
  onCategoryChange: (category: string) => void;
  onEventCategoryChange: (category: string) => void;
  handleCategoryChangeForUI: (category: string) => void;
};

interface IFormInput {
  title: string;
  description: string;
}
const MAX_DESCRIPTION_LENGTH = 400;

const AboutEvent: React.FC<AboutEventProps> = ({
  description,
  onEventNameChange,
  onDescriptionChange,
  onCategoryChange,
  onEventCategoryChange,
  handleCategoryChangeForUI,
}) => {
  const {
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleCategoryClick = (categoryName: string, categotyValue: string) => {
    setSelectedCategory(categoryName);
    onCategoryChange(categoryName);
    onEventCategoryChange(categotyValue);
    handleCategoryChangeForUI(categoryName);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionLength(e.target.value.length);
  };

  useEffect(() => {
    if (description === '') {
      onDescriptionChange('Опис події');
    }
  }, [description, onDescriptionChange]);
  return (
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10 mb-8">
      <div className="flex flex-col pb-6">
        <label className="pb-3 text-2xl">
          Назва події<span className="star">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Назва обов'язкова",
            validate: {
              minLength: value => value.length >= 5 || 'Мінімум 5 символів',
            },
          }}
          render={({ field }) => (
            <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
              <input
                minLength={5}
                maxLength={100}
                type="text"
                className="focus:outline-none w-full h-full p-4 rounded-[8px]"
                placeholder="Назви подію так, щоб людям було одразу зрозуміло, про що вона"
                onChange={e => {
                  onEventNameChange(e.target.value);
                  field.onChange(e);
                }}
              />
            </div>
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col pb-[25px]">
        <label htmlFor="" className="pb-4 text-2xl">
          Опис<span className="star">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Опис обов'язковий",
            validate: {
              minLength: value => value.length >= 20 || 'Мінімум 20 символів',
            },
          }}
          render={({ field }) => (
            <div className="w-full p-[2px] h-[120px] bg-createEventInputBorder rounded-[10px]">
              <textarea
                className="focus:outline-none w-full h-full p-4 rounded-[8px] resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
                id=""
                placeholder="Коротко опиши ідею та концепцію події"
                onChange={e => {
                  handleDescriptionChange(e);
                  field.onChange(e);
                  onDescriptionChange(e.target.value);
                }}
              ></textarea>
            </div>
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <div className="text-right text-sm text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
          {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <span className="pb-4 text-2xl">
            Категорія<span className="star">*</span>
          </span>
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
        </div>
      </div>
    </div>
  );
};

export default AboutEvent;
