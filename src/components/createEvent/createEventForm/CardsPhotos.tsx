/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { createPortal } from 'react-dom';
import { AiOutlineUpload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { toast } from 'react-toastify';

import { imageTypes } from '@/assets/staticData/statickData';
import 'cropperjs/dist/cropper.css';

import { SharedBtn } from '@/components/ui';

interface PhotoCardProps {
  title: string;
  subtitle: string;
  id: number;
  photo: string | null;
  onPhotoChange: (id: number, photo: string | null) => void;
  handleImageFileChange: (id: number, image: File[]) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  title,
  subtitle,
  id,
  photo,
  onPhotoChange,
  handleImageFileChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const cropperRef = useRef<any>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 1 * 1024 * 1024;

    const files = event.target.files ? Array.from(event.target.files) : [];

    const invalidFileType = files.find(file => !imageTypes.includes(file.type));
    const invalidFileSize = files.find(file => file.size > MAX_FILE_SIZE);

    if (invalidFileType) {
      return toast.error('Невірний тип зображення');
    }

    if (invalidFileSize) {
      return toast.error('Додайте зображення розміром до 1 МБ');
    }

    // Перевірка, щоб було від 1 до 3 файлів
    if (files.length > 0 && files.length <= 3) {
      handleImageFileChange(id, files); // Передаємо файли в обробник
    }

    if (files.length > 0) {
      // Якщо є файли, читаємо їх і передаємо у батьківську компоненту
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoChange(id, reader.result as string); // Передаємо перше зображення
      };
      reader.readAsDataURL(files[0]); // Читаємо перше зображення
    }
  };

  const handleRemovePhoto = (e: any) => {
    e.stopPropagation();
    onPhotoChange(id, null);
  };

  const handleEditPhoto = (e: any) => {
    e.stopPropagation();
    if (photo) {
      setImageToCrop(photo);
      setShowCropper(true);
    }
  };

  const handleSaveCroppedImage = () => {
    if (cropperRef.current) {
      const croppedDataUrl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();

      setCroppedImage(croppedDataUrl);
      onPhotoChange(id, croppedDataUrl);
      setShowCropper(false);
    }
  };

  const handleCloseCropper = () => {
    setShowCropper(false);
  };

  return (
    <div className="py-8 relative">
      <div
        className="relative flex flex-col items-center justify-center w-[189px] h-[229px] bg-gray-100 rounded-[10px] hover:shadow-md cursor-pointer"
        onClick={() => document.getElementById(`file-input-${id}`)?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {photo ? (
          <img
            src={photo}
            alt="Uploaded"
            className={`absolute inset-0 w-full h-full object-cover rounded-[10px] ${isHovered ? 'blur-sm' : ''} transition-all duration-300`}
          />
        ) : (
          <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-[url('/images/exampleCard.svg')]"></div>
        )}

        {photo && isHovered && (
          <div className="absolute flex gap-[24px] top-2 right-2 text-gray-700 z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <GoPencil className="h-6 w-6 z-10" onClick={handleEditPhoto} />
            <BiTrash
              className="h-6 w-6 text-error"
              onClick={handleRemovePhoto}
            />
          </div>
        )}

        <div className="z-[5] text-center">
          {!photo && (
            <>
              <div className="flex justify-center">
                <AiOutlineUpload className="h-6 w-6" />
              </div>
              <div className="text-xs font-medium text-gray-700 mb-2">
                {title}
              </div>
            </>
          )}
        </div>
      </div>

      <input
        id={`file-input-${id}`}
        type="file"
        accept={imageTypes.join(',')}
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <div className="text-[12px] text-uploadBtnBg max-w-[210px] mt-3.5">
        {subtitle}
      </div>

      {/* Image Cropper Modal */}
      {showCropper &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
            <div className="bg-white border-2 p-16 border-buttonPurple rounded-[20px]">
              <Cropper
                src={imageToCrop || ''}
                style={{ height: 600, width: 600 }}
                initialAspectRatio={1}
                aspectRatio={1}
                ref={cropperRef}
                minCropBoxHeight={300}
                minCropBoxWidth={300}
                checkOrientation={true}
                viewMode={1}
                guides={true}
                zoomable={false}
              />
              <div className="justify-center mt-12 flex gap-[38px]">
                <SharedBtn
                  type="button"
                  secondary
                  onClick={handleCloseCropper}
                  className="w-[265.25px] h-12 "
                >
                  Відмінити
                </SharedBtn>
                <SharedBtn
                  type="button"
                  primary
                  onClick={handleSaveCroppedImage}
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
  );
};

export default PhotoCard;
