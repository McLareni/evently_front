/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type AboutOrganizerProps = {
  description: string;
  onDescriptionChange: (eventDescription: string) => void;
};

interface IFormInput {
  title: string;
  description: string;
}
const MAX_DESCRIPTION_LENGTH = 400;

const AboutOrganizer: React.FC<AboutOrganizerProps> = ({
  description,
  onDescriptionChange,
}) => {
  const {
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [descriptionLength, setDescriptionLength] = useState(0);

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
    <div className="w-[760px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10">
      <div className="flex flex-col pb-[25px]">
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
              onChange={e => {
                handleDescriptionChange(e);
                field.onChange(e);
                onDescriptionChange(e.target.value);
              }}
            ></textarea>
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <div className="text-right text-sm text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg">
          {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
        </div>
      </div>
    </div>
  );
};

export default AboutOrganizer;
