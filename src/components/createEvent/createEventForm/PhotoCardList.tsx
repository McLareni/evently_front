/* eslint-disable no-unused-vars */
import { AiFillCheckCircle } from 'react-icons/ai';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import PhotoCard from './CardsPhotos';
import MobilePhotoPicker from './MobilePhotoPicker';

interface PhotoCardListProps {
  onPhotoChange: (id: number, photo: string | null) => void;
  handleImageFileChange: (id: number, photo: (File | null)[]) => void;
  photos: (string | null)[];
  validateForm: boolean;
  countOldPhotos: number;
}
export const subtitles = [
  'Рекомендований розмір 400х400',
  'Максимальний розмір файлу: 1 МБ',
  'Підтримувані файли: .JPEG, .PNG',
];

export const PhotoCardList = ({
  onPhotoChange,
  handleImageFileChange,
  photos,
  validateForm,
  countOldPhotos,
}: PhotoCardListProps) => {
  const { isMobile } = useMediaVariables();

  return (
    <div className="relative lg:w-[760px] w-full lg:h-[321px] h-[540px] lg:mb-8 mb-4 rounded-[20px] p-4 lg:p-0 border-buttonPurple lg:border-2 border">
      {isMobile ? (
        <>
          <MobilePhotoPicker
            onPhotoChange={onPhotoChange}
            handleImageFileChange={handleImageFileChange}
            photos={photos}
          />
          {!photos[0] && (
            <div className="h-[14px]">
              <p className="text-red-500 text-xs mt-2">
                Додати 1 афішу обов’язково
              </p>
            </div>
          )}
        </>
      ) : (
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
              isOldPhoto={id < countOldPhotos}
            />
          ))}
        </div>
      )}
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
