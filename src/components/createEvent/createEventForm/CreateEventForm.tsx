/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';

// import { register } from 'module';
// import { useForm } from 'react-hook-form';
import { SharedBtn } from '@/components/ui';

import AboutEvent from './AboutEvent';
import PhotoCard from './CardsPhotos';
import DateAndPlace from './DateAndPlace';
import TicketPrice from './TicketPrice';

type CreateEventFormProps = {
  eventName: string;
  price: string;
  photos: (string | null)[];
  date: string;
  startTimeOption: string;
  onPhotoChange: (id: number, photo: string | null) => void;
  // onCategorieChange: (categorie: string) => void;
  onEventNameChange: (eventName: string) => void;
  // onDateChange: (data: string) => void;
  onPlaceChange: (place: string) => void;
  onPriceChange: (price: string) => void;
  onCategoryChange: (category: string) => void;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (startTime: string) => void;
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  eventName,
  price,
  photos,
  date,
  startTimeOption,
  onPhotoChange,
  onEventNameChange,
  onPriceChange,
  onCategoryChange,
  onPlaceChange,
  handleDateChange,
  handleStartTime,
}) => {
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const event = {
      title: eventName,
      dateDetails: {
        day: date,
        time: startTimeOption,
      },
      ticketPrice: price,
    };
    console.log(event);
  };

  const subtitles = [
    'Рекомендований розмір 400х400',
    'Максимальний розмір файлу: 50 МБ',
    'Підтримувані файли: .JPEG, .PNG',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
        <div className="flex flex-wrap items-center justify-center gap-16">
          {[0, 1, 2].map(id => (
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
      </div>
      <AboutEvent
        eventName={eventName}
        onEventNameChange={onEventNameChange}
        onCategoryChange={onCategoryChange}
      />
      <DateAndPlace
        date={date}
        onPlaceChange={onPlaceChange}
        handleDateChange={handleDateChange}
        handleStartTime={handleStartTime}
      />
      <TicketPrice price={price} onPriceChange={onPriceChange} />
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
