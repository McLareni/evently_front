/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { toast } from 'react-toastify';

import { updateUserAvatar } from '@/redux/auth/operations';
import { selectToken, selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { imageTypes } from '@/assets/staticData/statickData';
import 'cropperjs/dist/cropper.css';

import { UploadButton } from './UploadButton';

export const CropUploadImage: React.FC = () => {
  const [image, setImage] = useState('');

  const user = useAppSelector(selectUser);
  console.log(user);

  const { id } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const cropperRef = createRef<ReactCropperElement>();

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
    console.log('my file', files[0]);
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

      if (token) updateUserAvatar(file, token, id);
    }
  };

  return (
    <div className="relative">
      <div style={{ width: '100%' }}>
        <UploadButton onChange={onChange} />

        {image && (
          <div className="absolute z-20 p-[24px] bg-lightGray">
            <Cropper
              ref={cropperRef}
              style={{ height: 'auto', width: 400 }}
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
            <button style={{ float: 'right' }} onClick={getCropData}>
              Підтвердити
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
