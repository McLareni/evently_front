/* eslint-disable no-unused-vars */
import { FormProvider, useForm } from 'react-hook-form';

// import { register } from 'module';
// import { useForm } from 'react-hook-form';
import { SharedBtn } from '@/components/ui';

import AboutEvent from './AboutEvent';
import PhotoCard from './CardsPhotos';
import DateAndPlace from './DateAndPlace';
import TicketPrice from './TicketPrice';
import { useEffect, useState } from 'react';
// import { getUser } from '@/utils/adminHttp';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { createEvent } from '@/utils/eventsHttp';


type CreateEventFormProps = {
  photos: (string | null)[];
  eventName: string;
  eventType: string;
  price: number | 'Безкоштовно' | 'Ціна';
  date: string;
  startTimeOption: string;
  place: EventPlaceWithGps | null;
  onPhotoChange: (id: number, photo: string | null) => void;
  // onCategorieChange: (categorie: string) => void;
  onEventNameChange: (eventName: string) => void;
  // onDateChange: (data: string) => void;
  onPlaceChange: (newPlace: EventPlaceWithGps) => void;
  onPriceChange: (price: number | "Безкоштовно" | "Ціна") => void;
  onCategoryChange: (category: string) => void;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (endTime: string) => void;
};

const subtitles = [
  'Рекомендований розмір 400х400',
  'Максимальний розмір файлу: 50 МБ',
  'Підтримувані файли: .JPEG, .PNG',
];

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  photos,
  eventName,
  eventType,
  place,
  price,
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

  const methods = useForm({
    defaultValues:{
      organizers: {
        id: ""
      },
      firstImg: '',
      secondImg: '',
      thirdImg: '',
      eventTitle: '',
      eventDescription: '',
      eventType: '',
      startDate: '',
      startTime: '',
      endTime: '',
      ticketPrice: 0,
      numberOfTickets: 0,
      location: {
        city: "",
        street: "",
        venue: "",
        latitude: "",
        longitude: ""
      },
      eventUrl: '',
    }
  })

  
  const { handleSubmit } = methods;
  const [endTimeOption, setSelectedEndTimeOption] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [eventPrice, setEventPrice] = useState<number>();
  const [eventUrl, setEventUrl] = useState('');
  const [organizers, setOrganizers] = useState<string>('');
  
  const handleEndTime = (endTime: string) => setSelectedEndTimeOption(endTime);
  const handleDescriptionChange = (description: string) => setDescription(description);
  const handleNumberOfTicketsChange = (numberOfTickets: number) => setNumberOfTickets(numberOfTickets);
  const handleEventUrlChange = (eventUrl: string) => setEventUrl(eventUrl);
  
  const user = useAppSelector(selectUser)
  useEffect(() => {
    setOrganizers(user.id.toString())
  }, [user])
  useEffect(() => {
    if (price !== 'Безкоштовно' && price !== 'Ціна') {
      setEventPrice(price)
      
    }
  }, [price])
   

  const onSubmit = () => {
    const event = {
      title: eventName,
      description: description,
      dateDetails: {
        day: date,
        startTime: startTimeOption,
        endTime: endTimeOption,
      },
      ticketPrice: eventPrice,
      location: {
        city: place?.city,
        street: place?.name,
        venue: '',
        latitude: place?.lat.toString(),
        longitude: place?.lng.toString(),
      },
      // photos: photos,
      eventType: eventType,
      numberOfTickets: numberOfTickets, 
      eventUrl: eventUrl, 
      organizers: { 
        id: organizers,
      }, 
    };
    const eventPhotos = {
      firstImage: photos[0],
      secondImage: photos[1],
      thirdImage: photos[2]
    }
    console.log(event, eventPhotos)
    createEvent(event, eventPhotos).then(response => console.log(response))
  };


  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
        <div className="flex flex-wrap items-center justify-center gap-16">
          {[0, 1, 2].map(id => (
            <PhotoCard
              key={id}
              title={'Додати афішу'}
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
        onDescriptionChange={handleDescriptionChange}
      />
      <DateAndPlace
        date={date}
        onPlaceChange={onPlaceChange}
        handleDateChange={handleDateChange}
        handleStartTime={handleStartTime}
        handleEndTime={handleEndTime}
        handleEventUrlChange={handleEventUrlChange}
      />
      <TicketPrice 
        price={price} 
        onPriceChange={onPriceChange}
        handleNumberOfTicketsChange={handleNumberOfTicketsChange}
      />
      <div className="text-center">
        <SharedBtn
          type="submit"
          primary
          className="mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Створити подію
        </SharedBtn>
      </div>
    </form>
    </FormProvider>
  );
};

export default CreateEventForm;
