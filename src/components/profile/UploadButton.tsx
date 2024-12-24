import { FC, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface UploadButtonProps {
  // eslint-disable-next-line no-unused-vars
  getImage: (image: File) => void;
}

const imageTypes = ['image/jpeg', 'image/webp', 'image/svg', 'image/png'];

export const UploadButton: FC<UploadButtonProps> = ({ getImage }) => {
  const [image, setImage] = useState<File | null>(null);

  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer overflow-hidden`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!imageTypes.some(type => type === file.type)) {
        return toast.error('Невірний тип зображення');
      }
      getImage(file);
      setImage(file);
    }
  };

  return (
    <div className="relative">
      <input
        id="avatar"
        type="file"
        accept={imageTypes.join(',')}
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="avatar" className={labelStyles}>
        {image ? (
          <img
            className="object-cover h-[100%]"
            src={URL.createObjectURL(image)}
            alt="user logo"
          />
        ) : (
          <img
            // src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
            src="/images/user-logo.jpg"
            width={150}
            height={150}
            alt="user logo"
          />
        )}
        <div className="flex gap-[6px] items-center absolute -bottom-[24px] text-uploadBtnBg">
          <span className="text-[12px]">Додайте аватар</span>
          <AiOutlineUpload size={16} />
        </div>
      </label>
    </div>
  );
};
