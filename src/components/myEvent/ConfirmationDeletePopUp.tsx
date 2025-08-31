import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useDeleteMyEventMutation } from '@/redux/events/operations';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { Modal, SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';

interface IProps {
  popUpIsShow: boolean;
  onClose?: () => void;
  idEvent?: string;
  placeholder?: Reason;
}
const MAX_LENGTH = 400;

const ConfirmationDeletePopUp: React.FC<IProps> = ({
  popUpIsShow,
  onClose,
  idEvent,
  placeholder,
}) => {
  const [lenghtDesc, setLenghtDesc] = useState(0);
  const { isDesktop } = useMediaVariables();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      phoneNumber: '',
      description: '',
    },
  });

  const [deleteMyEvent, { isLoading }] = useDeleteMyEventMutation();

  const onSubmit: SubmitHandler<{
    phoneNumber: string;
    description: string;
  }> = async data => {
    if (!placeholder) {
      await deleteMyEvent({
        idEvent: idEvent || '',
        contact: data.phoneNumber,
        reason: data.description,
      });
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (placeholder) {
      setValue('phoneNumber', placeholder.contact || '');
      setValue('description', placeholder.reason || '');
    }
  }, [placeholder, setValue]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal isOpen={popUpIsShow} hiddenCross={isDesktop} onClose={onClose}>
      <form
        className="lg:w-[684px] min-w-[340px] w-full px-2.5 py-6 lg:p-6 flex flex-col gap-4 lg:gap-6 border lg:border-2 border-buttonPurple rounded-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-base lg:text-xl font-bold font-lato mb-0 lg:mb-4 text-center">
          Деталі скасування події
        </h2>
        <div className="relative">
          <input
            disabled={!!placeholder?.contact}
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
            className="w-full h-[48px] lg:h-[64px] border lg:border-2 rounded-[5px] lg:rounded-[10px]
    px-4 lg:px-6 outline-none bg-background text-xs lg:text-[20px]
    focus:placeholder-transparent border-buttonPurple"
            placeholder="+380670000000"
          />
          <label
            htmlFor="phoneNumber"
            className="absolute left-[16px] -top-4 bg-background px-1 lg:text-xl text-base hidden lg:block"
          >
            Контактний телефон для зв’язку
          </label>
        </div>

        <div className="relative">
          <textarea
            disabled={!!placeholder?.reason}
            {...register('description', {
              required: 'Це поле обов’язкове',
            })}
            onChange={e => {
              setLenghtDesc(e.target.value.length);
            }}
            className="w-full h-[104px] lg:h-[248px] border lg:border-2 rounded-[5px] lg:rounded-[10px]
    px-4 lg:px-6 py-[20px] outline-none bg-background text-xs lg:text-[20px]
    focus:placeholder-transparent resize-none border-buttonPurple"
            placeholder="Опиши причину"
          />
          <label
            htmlFor="description"
            className="absolute left-[16px] -top-4 bg-background px-1 lg:text-xl text-base hidden lg:block"
          >
            Причина скасування
          </label>
          <p className="absolute right-0 -bottom-2.5 lg:-bottom-4 text-uploadBtnBg text-xs lg:text-sm">
            {lenghtDesc}/{MAX_LENGTH}
          </p>
        </div>
        <SharedBtn
          type="submit"
          className="w-[148px] lg:w-[200px] h-[36px] lg:h-[38px] mx-auto text-base lg:text-xl leading-5 font-normal font-lato"
          primary
        >
          {placeholder ? 'Закрити' : 'Відправити'}
        </SharedBtn>
      </form>
    </Modal>
  );
};

export default ConfirmationDeletePopUp;
