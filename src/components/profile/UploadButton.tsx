import { AiOutlineUpload } from 'react-icons/ai';

export const UploadButton = () => {
  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer`;

  return (
    <div className="relative">
      <input
        id="avatar"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
      />
      <label htmlFor="avatar" className={labelStyles}>
        <AiOutlineUpload size={32} />
      </label>
    </div>
  );
};
