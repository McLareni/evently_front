/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { FormaDataForCard } from '@/pages/events/CreateEventPage';
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
  photo: string | null;
  date: string;
  startTimeOption: string;
  place: CreateEventLocation;
  onPhotoChange: (id: number, photo: string | null) => void;
  onPlaceChange: (newPlace: CreateEventLocation) => void;
  handleDateChange: (newDate: string) => void;
  handleStartTime: (endTime: string) => void;
  getFormData: ({
    title,
    eventTypeName,
    ticketPrice,
    freeTickets,
  }: FormaDataForCard) => void;
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
  date,
  startTimeOption,
  onPhotoChange,
  onPlaceChange,
  handleDateChange,
  handleStartTime,
  getFormData,
}) => {
  const [endTimeOption, setSelectedEndTimeOption] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [isSuccessPopupShown, setIsSuccessPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<CreateEventFormValues>({
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
      eventType: 'OTHER',
      eventTypeName: 'Інше',
      startDate: '',
      startTime: '',
      endTime: '',
      ticketPrice: '',
      numberOfTickets: '',
      location: {
        city: '',
        street: '',
        venue: '',
        latitude: '',
        longitude: '',
      },
      eventUrl: '',
      freeTickets: false,
      isOffline: true,
    },
  });

  const title = watch('title');
  const eventTypeName = watch('eventTypeName');
  const ticketPrice = watch('ticketPrice');
  const freeTickets = watch('freeTickets');
  const isOffline = watch('isOffline');

  // валідація не hook form
  const validateDate = date.length > 0;
  const validateStart = startTimeOption.length > 0;
  const validateEnd = endTimeOption.length > 0;
  const validatePlace = () => {
    if (isOffline && place.city && place.street) return true;
    if (
      !isOffline &&
      (eventUrl.includes('www.') || eventUrl.includes('https://'))
    ) {
      return true;
    }
    return false;
  };
  const validatedPlace = validatePlace();
  const validateDateTimePlace =
    validateDate && validateStart && validateEnd && validatedPlace;
  const validatePhotos = photos[0] !== null;
  const validateForm = validateDateTimePlace && validatePhotos;

  const handleImageFileChange = (id: number, photo: (File | null)[]) => {
    setImageFile(prevPhotos => {
      const updatedPhotos = [...prevPhotos];

      updatedPhotos[id] = photo[0];

      return updatedPhotos;
    });
  };

  const handleEndTime = (endTime: string) => setSelectedEndTimeOption(endTime);

  const handleEventUrlChange = (eventUrl: string) =>
    setEventUrl(eventUrl.trim());

  const popupEvent = {
    title,
    type: eventTypeName,
    photoUrl: photo,
    eventUrl: eventUrl,
    location: {
      city: place?.city,
      street: place?.street,
    },
    date: {
      day: date,
      time: startTimeOption,
    },
    price: +ticketPrice,
  } as unknown as Event;

  const onSubmit = ({
    title,
    description,
    aboutOrganizer,
    organizers,
    eventType,
    ticketPrice,
    numberOfTickets,
    unlimitedTickets,
  }: CreateEventFormValues) => {
    const formattedNumberOfTickets =
      numberOfTickets.length === 0 ? '1' : numberOfTickets;

    const event = {
      title,
      description,
      eventType: eventType,
      aboutOrganizer,
      unlimitedTickets,
      eventUrl: eventUrl,
      location: {
        city: place?.city,
        street: place?.street,
        venue: '',
        latitude: place?.latitude,
        longitude: place?.longitude,
      },
      date: {
        day: date,
        time: startTimeOption,
        endTime: endTimeOption,
      },
      organizers,
      numberOfTickets: +formattedNumberOfTickets,
      ticketPrice: +ticketPrice,
    } as unknown as CreateEventFormValues;

    const firstImage = imageFile[0];
    const secondImage = imageFile[1];
    const thirdImage = imageFile[2];

    setIsLoading(true);
    createEvent(event, firstImage, secondImage, thirdImage)
      .then(response => {
        if (response.status === 201) {
          setIsSuccessPopupShown(true);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    getFormData({ title, eventTypeName, ticketPrice, freeTickets, isOffline });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, eventTypeName, ticketPrice, freeTickets, isOffline]);

  useEffect(() => {
    setValue('organizers.id', user.id);
  }, [setValue, user]);

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
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        date={date}
        onPlaceChange={onPlaceChange}
        handleDateChange={handleDateChange}
        handleStartTime={handleStartTime}
        handleEndTime={handleEndTime}
        handleEventUrlChange={handleEventUrlChange}
        validateDateTimePlace={validateDateTimePlace}
      />
      <TicketPrice
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        clearErrors={clearErrors}
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
