import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
// import { GoPencil } from "react-icons/go";
// import { BiTrash } from "react-icons/bi";

interface PhotoCardProps {
  title: string;
  subtitle: string;
  id: number;
  photo: string | null;
  onPhotoChange: (id: number, photo: string | null) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, subtitle, id, photo, onPhotoChange }) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoChange(id, reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="py-8">
      <div
        className="relative flex flex-col items-center justify-center w-[189px] h-[229px] bg-gray-100 rounded-[10px] hover:shadow-md cursor-pointer"
        onClick={() => document.getElementById(`file-input-${id}`)?.click()}
      >
        {photo ? (
          <img
            src={photo}
            alt="Uploaded"
            className="absolute inset-0 w-full h-full object-cover rounded-[10px] hover:blur-sm hover:easyin-out duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-[url('/images/exampleCard.svg')]"></div>
        )}
        <div className="z-10 text-center">
          {!photo && (
            <>
              <div className="flex justify-center">
                <AiOutlineUpload className="h-6 w-6"/>
              </div>
              <div className="text-xs font-medium text-gray-700 mb-2">{title}</div>
            </>
          )}
        </div>
      </div>
      <input
        id={`file-input-${id}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <div className="text-[12px] text-gray-300 max-w-[210px] mt-3.5">{subtitle}</div>
    </div>
  );
};

interface PhotoUploadSectionProps {
  photos: (string | null)[];
  onPhotoChange: (id: number, photo: string | null) => void;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ photos, onPhotoChange }) => {
  
  const subtitles = [
    "Рекомендований розмір 400х400",
    "Максимальний розмір файлу: 50 МБ",
    "Підтримувані файли: .JPEG, .PNG",
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-16">
      {[0, 1, 2].map((id) => (
        <PhotoCard
          key={id}
          title={'Додати фото події'}
          subtitle={subtitles[id]}
          id={id}
          photo={photos[id]}
          onPhotoChange={onPhotoChange}
        />
      ))}
    </div>
  );
};

export default PhotoUploadSection;
