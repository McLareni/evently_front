import { FC, HTMLProps, useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { imageTypes } from '@/assets/staticData/statickData';

type UploadButtonProps = HTMLProps<HTMLInputElement>;

export const UploadButton: FC<UploadButtonProps> = ({ ...props }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer overflow-hidden`;

  const imageWrapper = `w-[24px] h-[24px] rounded-full flex justify-center
  items-center absolute bottom-[10px] right-[10px] bg-background`;

  const { avatarImage } = useAppSelector(selectUser);

  const deleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // setImage(null);
  };

  useEffect(() => {
    if (avatarImage && avatarImage.photoInBytes) {
      setImageSrc(`data:image/png;base64,${avatarImage.photoInBytes}`);
    }
    return;
  }, [avatarImage]);

  return (
    <div className="relative">
      <input
        id="avatar"
        type="file"
        accept={imageTypes.join(',')}
        className="hidden"
        {...props}
      />
      <label htmlFor="avatar" className={labelStyles}>
        {imageSrc ? (
          <img
            className="object-cover h-[100%]"
            src={imageSrc}
            alt="user logo"
          />
        ) : (
          <img
            src="/images/user-logo.jpg"
            width={150}
            height={150}
            alt="user logo"
          />
        )}
        <div className={imageWrapper}>
          {avatarImage ? (
            <button
              onClick={deleteImage}
              className="w-[24px] h-[24px] flex justify-center items-center rounded-full"
            >
              <BiTrash size={18} />
            </button>
          ) : (
            <BiPencil size={18} />
          )}
        </div>
      </label>
    </div>
  );
};
