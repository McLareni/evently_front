/* eslint-disable no-unused-vars */
import { AiFillCheckCircle } from 'react-icons/ai';

import PhotoCard from './CardsPhotos';

interface PhotoCardListProps {
  onPhotoChange: (id: number, photo: string | null) => void;
  handleImageFileChange: (id: number, photo: (File | null)[]) => void;
  photos: (string | null)[];
  validateForm: boolean;
}

export const PhotoCardList = ({
  onPhotoChange,
  handleImageFileChange,
  photos,
  validateForm,
}: PhotoCardListProps) => {
  const subtitles = [
    'Рекомендований розмір 400х400',
    'Максимальний розмір файлу: 50 МБ',
    'Підтримувані файли: .JPEG, .PNG',
  ];

  return (
    <div className="relative w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
      <div className="flex flex-wrap items-center justify-center gap-16">
        {[0, 1, 2].map(id => (
          <PhotoCard
            key={id}
            title={'Додати фото події'}
            subtitle={subtitles[id]}
            id={id}
            photo={photos[id]}
            onPhotoChange={onPhotoChange}
            handleImageFileChange={handleImageFileChange}
          />
        ))}
      </div>
      {validateForm && (
        <AiFillCheckCircle
          size={40}
          color="#3BE660"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
        />
      )}
    </div>
  );
};
