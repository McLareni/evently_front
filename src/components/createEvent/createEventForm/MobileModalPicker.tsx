import React, { useRef, useState } from 'react';
import { Cropper } from 'react-cropper';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiImage, BiTrash } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { toast } from 'react-toastify';

import { imageTypes } from '@/assets/staticData/statickData';
import clsx from 'clsx';

import { SharedBtn } from '@/components/ui';

import { subtitles } from './PhotoCardList';

interface IProps {
  onClose?: () => void;
  onPhotoChange: (id: number, photo: string | null) => void;
  handleImageFileChange: (id: number, image: File[]) => void;
  photos?: (string | null)[];
}

const MobileModalPicker: React.FC<IProps> = ({
  onClose,
  onPhotoChange,
  handleImageFileChange,
  photos = [],
}) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [mode, setMode] = useState(photos[0] ? 'view' : 'edit');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
      handleImageFileChange(activeImage, files); // Передаємо файли в обробник
    }

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoChange(activeImage, reader.result as string); // Передаємо перше зображення
      };
      reader.readAsDataURL(files[0]); // Читаємо перше зображення
    }

    setMode('edit');
  };

  const handleRemovePhoto = (e: any) => {
    e.stopPropagation();
    onPhotoChange(activeImage, null);

    if (inputRefs.current[activeImage]) {
      inputRefs.current[activeImage]!.value = '';
    }
  };

  const handleSaveCroppedImage = () => {
    if (cropperRef.current) {
      const croppedDataUrl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();

      onPhotoChange(activeImage, croppedDataUrl);
      setMode('view');
    }
  };

  const handeReturn = (e: any) => {
    handleRemovePhoto(e);
    setMode('view');
  };

  return (
    <div className="fixed left-0 right-0 top-[71px] bottom-0 bg-background z-20 px-4 py-[25px] overflow-y-auto overflow-x-hidden">
      {mode === 'edit' ? (
        <div className="bg-white w-full rounded-[5px] overflow-hidden">
          <Cropper
            src={photos[activeImage] || ''}
            style={{ height: 540, width: '100%' }}
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
          <div className="mt-8 flex flex-col gap-6">
            <SharedBtn
              onClick={handleSaveCroppedImage}
              type="button"
              primary
              className="w-full h-12 text-center block"
            >
              Зберегти
            </SharedBtn>
            <SharedBtn
              onClick={e => handeReturn(e)}
              type="button"
              secondary
              className="w-full h-12 text-center block"
            >
              Назад
            </SharedBtn>
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-[540px] w-[358px] rounded-[5px] overflow-hidden">
            {photos[activeImage] ? (
              <img
                src={photos[activeImage] as string}
                alt=""
                className="w-full h-full rounded-[5px] object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-[url('/images/exampleCard.svg')] rounded-[5px]"></div>
            )}
            {photos[activeImage] && (
              <div className="absolute flex gap-2 text-gray-700 z-20 right-3 top-3">
                <GoPencil
                  className="h-8 w-8 text-textDark rounded-full bg-background p-1"
                  onClick={() => setMode('edit')}
                />
                <BiTrash
                  onClick={handleRemovePhoto}
                  className="h-8 w-8 text-error rounded-full bg-background p-1"
                />
              </div>
            )}
          </div>
          <div className="w-full flex items-center mt-4">
            <button
              onClick={() => {
                const emptyIndex = photos.findIndex(img => !img);

                if (emptyIndex === -1) return;
                inputRefs.current[emptyIndex]?.click();
              }}
              className="focus:outline-0 p-2 bg-lightBlue rounded-[5px] mr-[21px]"
            >
              <AiOutlinePlus className="w-6 h-6" />
            </button>
            <div className="flex flex-row flex-nowrap gap-3">
              {[0, 1, 2].map(id => (
                <div
                  key={id}
                  onClick={() => setActiveImage(id)}
                  className={clsx(
                    'relative h-20 w-[76px] flex items-center justify-center bg-[#F0F0F0] rounded-[5px] overflow-hidden',
                    {
                      'outline outline-[3px] outline-buttonPurple':
                        activeImage === id,
                    }
                  )}
                >
                  <BiImage className="h-4 w-4" />
                  {photos[id] && (
                    <img className="absolute inset-0" src={photos[id]} />
                  )}
                  <input
                    ref={el => (inputRefs.current[id] = el)}
                    id={`file-input-${id}`}
                    type="file"
                    accept={imageTypes.join(',')}
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              ))}
            </div>
          </div>
          <ul className="mt-4">
            {subtitles.map((subtitle, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#5A636C] font-lato text-[12px] font-normal leading-normal"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#5A636C]"></span>
                {subtitle}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6 w-full py-6">
            <SharedBtn
              type="button"
              primary
              className="w-full h-12 text-center block"
              onClick={onClose}
            >
              Продовжити
            </SharedBtn>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileModalPicker;
