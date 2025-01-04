/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { AiOutlineUpload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';

import 'cropperjs/dist/cropper.css';

interface PhotoCardProps {
  title: string;
  subtitle: string;
  id: number;
  photo: string | null;
  onPhotoChange: (id: number, photo: string | null) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  title,
  subtitle,
  id,
  photo,
  onPhotoChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<any>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        onPhotoChange(id, reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
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
      const croppedDataUrl = cropperRef.current
        .getCroppedCanvas({
          width: 400,
          height: 400,
        })
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
    <div className="py-8">
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
          <div className="absolute flex gap-[24px] top-2 right-2 text-gray-700 z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <GoPencil className="h-6 w-6 z-10" onClick={handleEditPhoto} />
            <BiTrash onClick={handleRemovePhoto} className="h-6 w-6" />
          </div>
        )}

        <div className="z-10 text-center">
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
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <div className="text-[12px] text-gray-300 max-w-[210px] mt-3.5">
        {subtitle}
      </div>

      {/* Image Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-[500px] relative">
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
              onClick={handleCloseCropper}
            >
              X
            </button>
            <Cropper
              src={imageToCrop || ''}
              style={{ width: '100%', height: '400px' }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCloseCropper}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
