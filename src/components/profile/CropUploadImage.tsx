/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

import { getUser, updateUserAvatar } from '@/redux/auth/operations';
import { selectToken, selectUser } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { imageTypes } from '@/assets/staticData/statickData';
import 'cropperjs/dist/cropper.css';

import { SharedBtn } from '../ui';
import Spinner from '../ui/Spinner';
import { UploadButton } from './UploadButton';

export const CropUploadImage: React.FC = () => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const cropperRef = createRef<ReactCropperElement>();

  const dispatch = useAppDispatch();

  const onChange = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!imageTypes.some(type => type === file.type)) {
        return toast.error('Невірний тип зображення');
      }
    }

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    setImage(files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const croppedImage = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();

      const byteString = atob(croppedImage.split(',')[1]);
      const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });

      const file = new File([blob], 'cropped-avatar.png', {
        type: mimeString,
      });

      if (token) {
        setIsLoading(true);
        setImage('');
        try {
          const response = await updateUserAvatar(file, token, id);

          if (response.status === 200) {
            await dispatch(getUser());
          }

          setIsLoading(false);

          return toast.success('Фото успішно оновлено');
        } catch (e) {
          console.error(e);
          setIsLoading(false);
          return toast.error('Сталася помилка');
        }
      }
    }
  };

  return (
    <div className="relative">
      {isLoading && <Spinner />}
      <div style={{ width: '100%' }}>
        <UploadButton onChange={onChange} />

        {image &&
          createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
              <div className="bg-white border-2 p-16 border-buttonPurple rounded-[20px]">
                <Cropper
                  ref={cropperRef}
                  style={{ height: 600, width: 600 }}
                  aspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={100}
                  minCropBoxWidth={100}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                  zoomable={false}
                />
                <div className="justify-center mt-12 flex gap-[38px]">
                  <SharedBtn
                    type="button"
                    secondary
                    onClick={() => setImage('')}
                    className="w-[265.25px] h-12 "
                  >
                    Відмінити
                  </SharedBtn>
                  <SharedBtn
                    type="button"
                    primary
                    onClick={getCropData}
                    className="w-[265.25px] h-12"
                  >
                    Зберегти
                  </SharedBtn>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};
