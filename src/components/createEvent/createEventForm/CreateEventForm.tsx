/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
// import { register } from 'module';
// import { useForm } from 'react-hook-form';

import { SharedBtn } from '@/components/ui';

import PhotoUploadSection from './CardsPhotos';

import AboutEvent from './AboutEvent';
import DateAndPlace from './DateAndPlace';
import TicketPrice from './TicketPrice';



type CreateEventFormProps = {
  eventName: string;
  price: string;
  photos: (string | null)[];
  onPhotoChange: (id: number, photo: string | null) => void;
  // onCategorieChange: (categorie: string) => void;
  onEventNameChange: (eventName: string) => void;
  // onDateChange: (data: string) => void;
  // onPlaceChange: (place: string) => void;
  onPriceChange: (price: string) => void;
  onCategoryChange: (category: string) => void;
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  eventName,
  price,
  photos,
  onPhotoChange,
  onEventNameChange,
  onPriceChange,
  onCategoryChange
}) => {


  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(data.address);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
        <PhotoUploadSection photos={photos} onPhotoChange={onPhotoChange} />
      </div>
      <AboutEvent eventName={eventName} onEventNameChange={onEventNameChange} onCategoryChange={onCategoryChange}/>
      <DateAndPlace/>
      <TicketPrice price={price} onPriceChange={onPriceChange}/>
      <div className="text-center">
        <SharedBtn
          type="submit"
          className="mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Створити подію
        </SharedBtn>
      </div>
    </form>
  );
};

export default CreateEventForm;
