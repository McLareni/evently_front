/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
  eventName: string;
  eventType: string;
  price: number | 'Безкоштовно' | 'Ціна';
  photo: string | null;
  date: string;
  startTimeOption: string;
  place: EventPlaceWithGps | null;
  onPhotoChange: (id: number, photo: string | null) => void;
  onEventNameChange: (eventName: string) => void;
  onPlaceChange: (newPlace: EventPlaceWithGps) => void;
  onPriceChange: (price: number | 'Безкоштовно' | 'Ціна') => void;
  handleCategoryChangeForUI: (category: string) => void;
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
  photo,
  place,
  price,
  date,
  startTimeOption,
  onPhotoChange,
  onEventNameChange,
  onPriceChange,
  handleCategoryChangeForUI,
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
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [ticketPrice, setTickePrice] = useState<number | undefined>();
  const [eventUrl, setEventUrl] = useState('');
  const [organizers, setOrganizers] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>('OTHER');
  const [aboutOrganizer, setAboutOrganizer] = useState('');
  const [isSuccessPopupShown, setIsSuccessPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [isOffline, setIsOffline] = useState(true);

  const validatedTitle =
    eventName.trim().length >= 5 && eventName.trim().length <= 100;
  const validatedDescription =
    description.trim().length >= 20 && description.trim().length <= 400;
  const validateTitleDescr = validatedTitle && validatedDescription;

  const validateDate = date.length > 0;
  const validateStart = startTimeOption.length > 0;
  const validateEnd = endTimeOption.length > 0;
  const validatePlace = () => {
    if (isOffline && place) return true;
    if (
      !isOffline &&
      (eventUrl.includes('www.') || eventUrl.includes('https://'))
    )
      return true;
  };
  const validatedPlace = validatePlace();
  const validateDateTime =
    validateDate && validateStart && validateEnd && validatedPlace;

  const validateForm = validateTitleDescr && validateDateTime;

  const toggleOfflineOnline = (value: boolean) => {
    setIsOffline(value);
  };

  const handleImageFileChange = (id: number, photo: (File | null)[]) => {
    setImageFile(prevPhotos => {
      const updatedPhotos = [...prevPhotos];

      updatedPhotos[id] = photo[0];

      return updatedPhotos;
    });
  };

  const handleEndTime = (endTime: string) => setSelectedEndTimeOption(endTime);

  const handleDescriptionChange = (description: string) =>
    setDescription(description);

  const handleAboutOrganizerChange = (aboutOrganizer: string) =>
    setAboutOrganizer(aboutOrganizer);

  const handleNumberOfTicketsChange = (numberOfTickets: string) =>
    setNumberOfTickets(numberOfTickets);

  const handleEventUrlChange = (eventUrl: string) =>
    setEventUrl(eventUrl.trim());

  const onEventCategoryChange = (categoryValue: string) =>
    setCategoryValue(categoryValue);

  const toggleIsUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  const popupEvent = {
    title: eventName,
    description: description,
    type: eventType,
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

  const onSubmit = () => {
    const event = {
      title: eventName,
      description: description,
      eventType: categoryValue,
      aboutOrganizer: aboutOrganizer,
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
      organizers: {
        id: organizers,
      },
      numberOfTickets: +numberOfTickets,
      ticketPrice: ticketPrice,
    };

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

  useEffect(() => {
    isUnlimited && setNumberOfTickets('');
  }, [isUnlimited]);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    setOrganizers(user.id.toString());
  }, [user]);

  useEffect(() => {
    if (price !== 'Безкоштовно' && price !== 'Ціна') {
      setTickePrice(price);
    }
  }, [price]);

  return (
    <FormProvider {...methods}>
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
                handleImageFileChange={handleImageFileChange}
              />
            ))}
          </div>
        </div>
        <AboutEvent
          handleCategoryChangeForUI={handleCategoryChangeForUI}
          description={description}
          onEventNameChange={onEventNameChange}
          onCategoryChange={onEventCategoryChange}
          onDescriptionChange={handleDescriptionChange}
          onEventCategoryChange={onEventCategoryChange}
          validateTitleDescr={validateTitleDescr}
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
        <AboutOrganizer
          handleAboutOrganizerChange={handleAboutOrganizerChange}
        />
        <div className="text-center">
          <SharedBtn
            disabled={!validateForm}
            type="submit"
            primary
            className="mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
          >
            Створити подію
          </SharedBtn>
        </div>
      </form>
      {isLoading && <Spinner />}
      {isSuccessPopupShown && <PopupEventCreated event={popupEvent} />}
    </FormProvider>
  );
};

export default CreateEventForm;
