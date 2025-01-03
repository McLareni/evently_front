import { FC, HTMLProps } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';

// import { toast } from 'react-toastify';

interface UploadButtonProps extends HTMLProps<HTMLInputElement> {
  cropData: string;
}

const imageTypes = ['image/jpeg', 'image/webp', 'image/svg', 'image/png'];

export const UploadButton: FC<UploadButtonProps> = ({ cropData, ...props }) => {
  // const [image, setImage] = useState<File | null>(null);

  const labelStyles = `w-[150px] h-[150px] bg-uploadBtnBg rounded-full
  flex justify-center items-center cursor-pointer overflow-hidden`;

  const imageWrapper = `w-[24px] h-[24px] rounded-full flex justify-center
  items-center absolute bottom-[10px] right-[10px] bg-background`;

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     if (!imageTypes.some(type => type === file.type)) {
  //       return toast.error('Невірний тип зображення');
  //     }
  //     // getImage(file);
  //     setImage(file);
  //   }
  // };

  const deleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // setImage(null);
  };

  return (
    <div className="relative">
      <input
        id="avatar"
        type="file"
        accept={imageTypes.join(',')}
        className="hidden"
        {...props}
        // onChange={handleFileChange}
      />
      <label htmlFor="avatar" className={labelStyles}>
        {cropData ? (
          <img
            className="object-cover h-[100%]"
            src={cropData}
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
        <div className={imageWrapper}>
          {cropData ? (
            <button
              onClick={deleteImage}
              className="w-[24px] h-[24px] flex justify-center items-center rounded-full"
            >
              <BiTrash size={18} />
            </button>
          ) : (
            <BiPencil size={18} />
          )}
        </div>
      </label>
    </div>
  );
};
