import { FC, HTMLProps, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { deleteUserAvatar, getUser } from '@/redux/auth/operations';
import { selectToken, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { imageTypes } from '@/assets/staticData/statickData';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import Spinner from '../ui/Spinner';

const labelStyles = `lg:w-[150px] lg:h-[150px] w-[112px] h-[112px] bg-uploadBtnBg rounded-full
flex justify-center items-center cursor-pointer overflow-hidden`;

const imageWrapper = `w-[24px] h-[24px] rounded-full flex justify-center
items-center absolute bottom-[10px] right-[10px] bg-background`;

type UploadButtonProps = HTMLProps<HTMLInputElement>;

export const UploadButton: FC<UploadButtonProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { avatarImage, id } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const { isDesktop } = useMediaVariables();

  const dispatch = useAppDispatch();

  const deleteImage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (token) {
        const response = await deleteUserAvatar(token, id);
        if (response.status === 200) {
          await dispatch(getUser());
        }
        setIsLoading(false);
        return toast.success('Фото успішно видалено');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return toast.error('Сталася помилка');
    }
  };

  return (
    <div className="relative">
      {isLoading && <Spinner />}
      <input
        id="avatar"
        type="file"
        accept={imageTypes.join(',')}
        className="hidden"
        {...props}
      />
      <label htmlFor="avatar" className={labelStyles}>
        {avatarImage ? (
          <img
            className="object-cover h-[100%]"
            src={avatarImage.url}
            alt="user logo"
          />
        ) : (
          <img
            src="/images/user-logo.jpg"
            width={isDesktop ? 150 : 112}
            height={isDesktop ? 150 : 112}
            alt="user logo"
          />
        )}
        <div className={imageWrapper}>
          {avatarImage ? (
            <button
              onClick={deleteImage}
              className="w-[24px] h-[24px] flex justify-center items-center rounded-full"
            >
              <BiTrash className="w-6 h-6" />
            </button>
          ) : (
            <BiPencil className="w-6 h-6" />
          )}
        </div>
      </label>
    </div>
  );
};
