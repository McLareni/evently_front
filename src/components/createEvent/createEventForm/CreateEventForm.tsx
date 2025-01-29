/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { selectUser } from '@/redux/auth/selectors';
// import { getUser } from '@/utils/adminHttp';
import { useAppSelector } from '@/redux/hooks';

import { createEvent } from '@/utils/eventsHttp';

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
  onPriceChange: (price: number | 'Безкоштовно' | 'Ціна') => void;
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
    defaultValues: {
      organizers: {
        id: '',
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
        city: '',
        street: '',
        venue: '',
        latitude: '',
        longitude: '',
      },
      eventUrl: '',
    },
  });

  const { handleSubmit } = methods;
  const [endTimeOption, setSelectedEndTimeOption] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [ticketPrice, setTickePrice] = useState<number | undefined>();
  const [eventUrl, setEventUrl] = useState('');
  const [organizers, setOrganizers] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>('');


  const [imageFile, setImageFile] = useState<(File | null)[]>([null, null, null]);
  // const handleImageFileChange = (image: File) => setImageFile(image);
  const handleImageFileChange = (id: number, photo: (File | null)[]) => {
    setImageFile((prevPhotos) => {
      const updatedPhotos = [...prevPhotos]; // Створюємо копію попереднього стану
  
      // Оновлюємо конкретний елемент на новий масив файлів (або null)
      updatedPhotos[id] = photo[0]; 
  
      return updatedPhotos; // Повертаємо новий масив
    });
  };
  
  const handleEndTime = (endTime: string) => setSelectedEndTimeOption(endTime);
  const handleDescriptionChange = (description: string) => setDescription(description);
  const handleNumberOfTicketsChange = (numberOfTickets: number) => setNumberOfTickets(numberOfTickets);
  const handleEventUrlChange = (eventUrl: string) => setEventUrl(eventUrl);
  const onEventCategoryChange = (categoryValue: string) => setCategoryValue(categoryValue)

  const user = useAppSelector(selectUser);
  useEffect(() => {
    setOrganizers(user.id.toString());
  }, [user]);
  useEffect(() => {
    if (price !== 'Безкоштовно' && price !== 'Ціна') {
      setTickePrice(price);
    }
  }, [price]);

  const onSubmit = () => {
    const event = {
      title: eventName,
      description: description,
        eventType: categoryValue,
      phoneNumber: '+380123456789',
      location: {
        city: place?.city,
        street: place?.name,
        venue: '',
        latitude: place?.lat,
        longitude: place?.lng,
      },
        dateDetails: {
        day: date,
        startTime: startTimeOption,
        endTime: endTimeOption,
      },
      organizers: {
        id: organizers,
      },
      numberOfTickets: numberOfTickets,
      ticketPrice: ticketPrice,
      // firstImage: photos[0]
    };
    // };
    // // const eventPhotos = {
    // //   firstImage: photos[0],
    // //   secondImage: photos[1],
    // //   thirdImage: photos[2]
    // // }
    const firstImage = imageFile[0];
    const secondImage = imageFile[1];
    console.log(secondImage)
    const thirdImage = imageFile[2];
    console.log(thirdImage);
    createEvent(event, firstImage, secondImage, thirdImage ).then(response => console.log(response));
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
                handleImageFileChange={handleImageFileChange}
              />
            ))}
          </div>
        </div>
        <AboutEvent
          eventName={eventName}
          description={description}
          onEventNameChange={onEventNameChange}
          onCategoryChange={onEventCategoryChange}
          onDescriptionChange={handleDescriptionChange}
          onEventCategoryChange={onEventCategoryChange} 
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
        <img src="" alt="" />
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
