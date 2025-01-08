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
  photos: (string | null)[];
  eventName: string;
  description: string;
  category: string;
  price: string;
  date: string;
  startTimeOption: string;
  endTimeOption: string;
  place: EventPlaceWithGps | null;
  onPhotoChange: (id: number, photo: string | null) => void;
  // onCategorieChange: (categorie: string) => void;
  onEventNameChange: (eventName: string) => void;
  onDescriptionChange: (eventName: string) => void;
  // onDateChange: (data: string) => void;
  onPlaceChange: (newPlace: EventPlaceWithGps) => void;
  onPriceChange: (price: string) => void;
  onCategoryChange: (category: string) => void;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (startTime: string) => void;
  handleEndTime: (endTime: string) => void;
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  photos,
  eventName,
  description,
  category,
  place,
  price,
  date,
  // numberOfTickets,
  startTimeOption,
  endTimeOption,
  onPhotoChange,
  onEventNameChange,
  onPriceChange,
  onCategoryChange,
  onPlaceChange,
  onDescriptionChange,
  handleDateChange,
  handleStartTime,
  handleEndTime,
}) => {
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const event = {
      title: eventName,
      description: description,
      category: category,
      dateDetails: {
        day: date,
        startTime: startTimeOption,
        endTime: endTimeOption,
      },
      ticketPrice: price,
      location: {
        city: place?.city,
        street: place?.name,
        venue: '',
        latitude: place?.lat,
        longitude: place?.lng,
      },
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
        description={description}
        onEventNameChange={onEventNameChange}
        onCategoryChange={onCategoryChange}
        onDescriptionChange={onDescriptionChange}
      />
      <DateAndPlace
        date={date}
        onPlaceChange={onPlaceChange}
        handleDateChange={handleDateChange}
        handleStartTime={handleStartTime}
        handleEndTime={handleEndTime}
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
