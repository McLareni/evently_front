/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { createEvent } from '@/utils/eventsHttp';

import { SharedBtn } from '@/components/ui';
import { PopupEventCreated } from '@/components/ui/PopupEventCreated';
import Spinner from '@/components/ui/Spinner';

import AboutEvent from './AboutEvent';
import AboutOrganizer from './AboutOrganizer';
import PhotoCard from './CardsPhotos';
import DateAndPlace from './DateAndPlace';
import TicketPrice from './TicketPrice';

type CreateEventFormProps = {
  photos: (string | null)[];
  price: number | 'Безкоштовно' | 'Ціна';
  photo: string | null;
  date: string;
  startTimeOption: string;
  place: EventPlaceWithGps | null;
  onPhotoChange: (id: number, photo: string | null) => void;
  onPlaceChange: (newPlace: EventPlaceWithGps) => void;
  onPriceChange: (price: number | 'Безкоштовно' | 'Ціна') => void;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (endTime: string) => void;
  toggleOfflineOnline: (value: boolean) => void;
  isOffline: boolean;
};

const subtitles = [
  'Рекомендований розмір 400х400',
  'Максимальний розмір файлу: 50 МБ',
  'Підтримувані файли: .JPEG, .PNG',
];

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  photos,
  photo,
  place,
  price,
  date,
  startTimeOption,
  onPhotoChange,
  onPriceChange,
  onPlaceChange,
  handleDateChange,
  handleStartTime,
  toggleOfflineOnline,
  isOffline,
}) => {
  const [endTimeOption, setSelectedEndTimeOption] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [ticketPrice, setTickePrice] = useState<number | undefined>();
  const [eventUrl, setEventUrl] = useState('');
  const [categoryValue, setCategoryValue] = useState<string>('OTHER');
  const [isSuccessPopupShown, setIsSuccessPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      organizers: {
        id: '',
      },
      firstImg: '',
      secondImg: '',
      thirdImg: '',
      aboutOrganizer: '',
      unlimitedTickets: false,
      title: '',
      description: '',
      eventType: { name: 'Інше', value: 'OTHER' },
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

  const validateDate = date.length > 0;
  const validateStart = startTimeOption.length > 0;
  const validateEnd = endTimeOption.length > 0;
  const validatePlace = () => {
    if (isOffline && place) return true;
    if (
      !isOffline &&
      (eventUrl.includes('www.') || eventUrl.includes('https://'))
    ) {
      return true;
    }
    return false;
  };
  const validatedPlace = validatePlace();
  const validateDateTime =
    validateDate && validateStart && validateEnd && validatedPlace;

  const validatePhotos = photos[0] !== null;

  const validateForm = validatePhotos && validateDateTime;

  const handleImageFileChange = (id: number, photo: (File | null)[]) => {
    setImageFile(prevPhotos => {
      const updatedPhotos = [...prevPhotos];

      updatedPhotos[id] = photo[0];

      return updatedPhotos;
    });
  };

  const handleEndTime = (endTime: string) => setSelectedEndTimeOption(endTime);

  const handleNumberOfTicketsChange = (numberOfTickets: string) =>
    setNumberOfTickets(numberOfTickets);

  const handleEventUrlChange = (eventUrl: string) =>
    setEventUrl(eventUrl.trim());

  const toggleIsUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  const title = watch('title');
  const description = watch('description');
  const eventTypeName = watch('eventType.name');

  const popupEvent = {
    title,
    description,
    type: eventTypeName,
    photoUrl: photo,
    eventUrl: eventUrl,
    location: {
      city: place?.city,
      street: place?.name,
    },
    date: {
      day: date,
      time: startTimeOption,
    },
    price: ticketPrice,
  } as unknown as Event;

  const onSubmit = ({
    title,
    description,
    aboutOrganizer,
    organizers,
    eventType,
  }) => {
    const event = {
      title,
      description,
      eventType: eventType.value,
      aboutOrganizer,
      unlimitedTickets: false,
      eventUrl: eventUrl,
      location: {
        city: place?.city,
        street: place?.name,
        venue: '',
        latitude: place?.lat,
        longitude: place?.lng,
      },
      date: {
        day: date,
        time: startTimeOption,
        endTime: endTimeOption,
      },
      organizers,
      numberOfTickets: +numberOfTickets,
      ticketPrice: ticketPrice,
    };

    const firstImage = imageFile[0];
    const secondImage = imageFile[1];
    const thirdImage = imageFile[2];

    // setIsLoading(true);
    // createEvent(event, firstImage, secondImage, thirdImage)
    //   .then(response => {
    //     if (response.status === 201) {
    //       setIsSuccessPopupShown(true);
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     setIsLoading(false);
    //     console.error(error);
    //   });
    console.log(event);
  };

  useEffect(() => {
    isUnlimited && setNumberOfTickets('');
  }, [isUnlimited]);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    setValue('organizers.id', user.id);
  }, [setValue, user]);

  useEffect(() => {
    if (price !== 'Безкоштовно' && price !== 'Ціна') {
      setTickePrice(price);
    }
  }, [price]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-[760px] h-[321px] mb-8 rounded-[20px] border-buttonPurple border-2">
        <div className="flex flex-wrap items-center justify-center gap-16">
          {[0, 1, 2].map(id => (
            <PhotoCard
              key={id}
              title={'Додати фото події'}
              subtitle={subtitles[id]}
              id={id}
              photo={photos[id]}
              onPhotoChange={onPhotoChange}
              handleImageFileChange={handleImageFileChange}
            />
          ))}
        </div>
        {validatePhotos && (
          <AiFillCheckCircle
            size={40}
            color="#3BE660"
            style={{ position: 'absolute', right: '8px', top: '8px' }}
          />
        )}
      </div>
      <AboutEvent
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <DateAndPlace
        date={date}
        onPlaceChange={onPlaceChange}
        handleDateChange={handleDateChange}
        handleStartTime={handleStartTime}
        handleEndTime={handleEndTime}
        handleEventUrlChange={handleEventUrlChange}
        toggleOfflineOnline={toggleOfflineOnline}
        isOffline={isOffline}
        validateDateTime={validateDateTime}
      />
      <TicketPrice
        price={price}
        onPriceChange={onPriceChange}
        handleNumberOfTicketsChange={handleNumberOfTicketsChange}
        isUnlimited={isUnlimited}
        toggleIsUnlimited={toggleIsUnlimited}
        numberOfTickets={numberOfTickets}
      />
      <AboutOrganizer control={control} setValue={setValue} watch={watch} />
      <div className="text-center">
        <SharedBtn
          disabled={!isValid || !validateForm}
          type="submit"
          primary
          className="mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Створити подію
        </SharedBtn>
      </div>
      {isLoading && <Spinner />}
      {isSuccessPopupShown && <PopupEventCreated event={popupEvent} />}
    </form>
  );
};

export default CreateEventForm;
