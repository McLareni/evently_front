import { FC, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

interface UploadButtonProps {
  // eslint-disable-next-line no-unused-vars
  getImage: (image: File) => void;
}

export const UploadButton: FC<UploadButtonProps> = ({ getImage }) => {
  const [image, setImage] = useState<File | null>(null);

  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer overflow-hidden`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      getImage(file);
      setImage(file);
    }
  };

  return (
    <div className="relative">
      <input
        id="avatar"
        type="file"
        accept="image/png, image/jpeg"
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
