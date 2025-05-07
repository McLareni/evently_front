import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useDeleteMyEventMutation } from '@/redux/events/operations';


import { Modal, SharedBtn } from '../ui';

interface IProps {
  popUpIsShow: boolean;
  onClose?: () => void;
  idEvent: string;
}
const MAX_LENGTH = 400;

const ConfirmationDeletePopUp: React.FC<IProps> = ({
  popUpIsShow,
  onClose,
  idEvent,
}) => {
  const [lenghtDesc, setLenghtDesc] = useState(0);
  const { register, handleSubmit } = useForm({
    defaultValues: { phoneNumber: '', description: '' },
  });

  const [deleteMyEvent] = useDeleteMyEventMutation();

  const onSubmit: SubmitHandler<{
    phoneNumber: string;
    description: string;
  }> = async data => {
    await deleteMyEvent({
      idEvent,
      contact: data.phoneNumber,
      reason: data.description,
    });
  };

  return (
    <Modal isOpen={popUpIsShow} hiddenCross onClose={onClose}>
      <form
        className="w-[684px] p-6 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold font-lato mb-4 text-center">
          Деталі скасування події
        </h2>
        <div className="relative">
          <input
            {...register('phoneNumber', {
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
            })}
            type="text"
            className="w-full h-[64px] border-[2px] rounded-[10px]
    px-[24px] outline-none bg-background text-[20px]
    focus:placeholder-transparent border-buttonPurple"
            placeholder="+380670000000"
          />
          <label
            htmlFor="phoneNumber"
            className="absolute left-[16px] -top-4 bg-background px-1 text-xl"
          >
            Контактний телефон для зв’язку
          </label>
        </div>

        <div className="relative">
          <textarea
            {...register('description', {
              required: 'Це поле обов’язкове',
            })}
            onChange={e => {
              setLenghtDesc(e.target.value.length);
            }}
            className="w-full h-[248px] border-[2px] rounded-[10px]
    px-[24px] py-[20px] outline-none bg-background text-[20px]
    focus:placeholder-transparent resize-none border-buttonPurple"
            placeholder="Опиши причину"
          />
          <label
            htmlFor="description"
            className="absolute left-[16px] -top-4 bg-background px-1 text-xl"
          >
            Причина скасування
          </label>
          <p className="absolute right-0 -bottom-4 text-uploadBtnBg text-sm">
            {lenghtDesc}/{MAX_LENGTH}
          </p>
        </div>
        <SharedBtn
          type="submit"
          className="w-[200px] h-[38px] mx-auto text-xl leading-5 font-normal font-lato"
          primary
        >
          Відправити
        </SharedBtn>
      </form>
    </Modal>
  );
};

export default ConfirmationDeletePopUp;
