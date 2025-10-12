import React, { useRef, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { imageTypes } from '@/assets/staticData/statickData';

import MobileModalPicker from './MobileModalPicker';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onPhotoChange: (id: number, photo: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  handleImageFileChange: (id: number, image: File[]) => void;
  photos?: (string | null)[];
}

const MobilePhotoPicker: React.FC<IProps> = ({
  onPhotoChange,
  handleImageFileChange,
  photos = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const files = event.target.files ? Array.from(event.target.files) : [];

    const invalidFileType = files.find(file => !imageTypes.includes(file.type));
    const invalidFileSize = files.find(file => file.size > MAX_FILE_SIZE);

    if (invalidFileType) {
      return toast.error('Невірний тип зображення');
    }

    if (invalidFileSize) {
      return toast.error('Додайте зображення розміром до 10 МБ');
    }

    // Перевірка, щоб було від 1 до 3 файлів
    if (files.length > 0 && files.length <= 3) {
      handleImageFileChange(0, files); // Передаємо файли в обробник
    }

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoChange(0, reader.result as string); // Передаємо перше зображення
      };
      reader.readAsDataURL(files[0]); // Читаємо перше зображення
    }

    setIsOpen(true);
  };

  return (
    <>
      <div className="relative flex w-full h-[calc(100%-22px)] bg-gray-100 rounded-[10px] hover:shadow-md cursor-pointer overflow-hidden">
        {photos[0] ? (
          <img
            src={photos[0] as string}
            alt=""
            className="w-full h-full object-cover rounded-[5px]"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-[url('/images/exampleCard.svg')] rounded-[5px]"></div>
        )}
        {!photos[0] && (
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute flex flex-col items-center gap-1 text-gray-700
       bg-background z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] p-4"
          >
            <AiOutlineUpload className="h-8 w-8 fill-buttonPurple" />
            <p className="text-buttonPurple text-xs">Додати фото події</p>
            <input
              ref={inputRef}
              id={`file-input-${0}`}
              type="file"
              accept={imageTypes.join(',')}
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <MobileModalPicker
          onPhotoChange={onPhotoChange}
          handleImageFileChange={handleImageFileChange}
          onClose={() => setIsOpen(false)}
          photos={photos}
        />
      )}
    </>
  );
};

export default MobilePhotoPicker;
