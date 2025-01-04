import React, { createRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

import 'cropperjs/dist/cropper.css';

import { UploadButton } from './UploadButton';

interface CropUploadImageProps {
  // eslint-disable-next-line no-unused-vars
  getImage: (image: File) => void;
}

export const CropUploadImage: React.FC<CropUploadImageProps> = () => {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');

  const cropperRef = createRef<ReactCropperElement>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      setImage('');
    }
  };

  return (
    <div className="relative">
      <div style={{ width: '100%' }}>
        <UploadButton onChange={onChange} cropData={cropData} />

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
