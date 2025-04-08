/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { formatPhoneNumberFromMask } from '@/helpers/userForm/formatFromMask';
import { formatPhoneToMask } from '@/helpers/userForm/formatToMask';
import { FormaDataForCard } from '@/pages/events/CreateEventPage';
import { createEvent, editEvent } from '@/utils/eventsHttp';

import { SharedBtn } from '@/components/ui';
import { PopupEventCreated } from '@/components/ui/PopupEventCreated';
import Spinner from '@/components/ui/Spinner';

import AboutEvent from './AboutEvent';
import AboutOrganizer from './AboutOrganizer';
import DateAndPlace from './DateAndPlace';
import { PhotoCardList } from './PhotoCardList';
import TicketPrice from './TicketPrice';
import { defaultValues } from './defaultValues';

type CreateEventFormProps = {
  photos: (string | null)[];
  onPhotoChange: (id: number, photo: string | null) => void;
  getFormData: ({
    title,
    eventTypeName,
    ticketPrice,
    freeTickets,
    day,
    location,
  }: FormaDataForCard) => void;
  isEdit?: boolean;
  event?: Event;
  countOldPhotos?: number;
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  photos,
  onPhotoChange,
  getFormData,
  isEdit,
  event,
  countOldPhotos = 0,
}) => {
  const { phoneNumber } = useAppSelector(selectUser);
  const [isSuccessPopupShown, setIsSuccessPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [agreement, setAgreement] = useState(false);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { isValid, errors },
  } = useForm<CreateEventFormValues>({
    mode: 'onChange',
    defaultValues: (isEdit && event) || defaultValues,
  });

  const title = watch('title');
  const eventTypeName = watch('eventTypeName');
  const ticketPrice = watch('ticketPrice');
  const freeTickets = watch('freeTickets');
  const isOffline = watch('isOffline');
  const eventUrl = watch('eventUrl');
  const location = watch('location');
  const date = watch('date');

  const validateForm = photos[0] !== null;

  const handleImageFileChange = (id: number, photo: (File | null)[]) => {
    setImageFile(prevPhotos => {
      const updatedPhotos = [...prevPhotos];

      updatedPhotos[id] = photo[0];

      return updatedPhotos;
    });
  };

  const checkAgreement = () => {
    setAgreement(!agreement);
  };

  const checkAdult = () => {
    setAdult(!adult);
  };

  useEffect(() => {
    if (isEdit && event) {
      setValue('title', event.title);
      setValue('description', event.description);
      setValue('eventTypeName', event.type);
      setValue('isOffline', event.eventFormat === 'OFFLINE');
      setValue('location', event.location);
      setValue('date', event.date);
      setValue('eventUrl', event.eventUrl || '');
      setValue('freeTickets', event.price === 0);
      setValue('ticketPrice', event.price.toString());
      setValue('numberOfTickets', event.numberOfTickets);
      setValue('unlimitedTickets', event.unlimitedTickets);
      setValue('aboutOrganizer', event.aboutOrganizer || '');
      setValue(
        'phoneNumber',
        event.phoneNumber || formatPhoneToMask(phoneNumber)
      );

      trigger('phoneNumber');

      console.log(watch('date'));
    }
  }, [event]);

  const popupEvent =
    imageFile[0] &&
    ({
      title,
      type: eventTypeName,
      images: [{ url: URL.createObjectURL(imageFile[0]) }],
      eventUrl: eventUrl,
      location: {
        city: location.city,
        street: location.street,
      },
      date: {
        day: date.day,
        time: date.time,
      },
      price: +ticketPrice,
    } as unknown as Event);

  const onSubmit = ({
    title,
    description,
    aboutOrganizer,
    organizers,
    eventType,
    ticketPrice,
    numberOfTickets,
    unlimitedTickets,
    eventUrl,
    location,
    date,
    phoneNumber,
  }: CreateEventFormValues) => {
    const formattedNumberOfTickets =
      numberOfTickets === 0 ? '1' : numberOfTickets;
    const formattedPrice = ticketPrice.length === 0 ? 0 : ticketPrice;
    const eventFormat = isOffline ? 'OFFLINE' : 'ONLINE';

    const firstImage = imageFile[0];
    const secondImage = imageFile[1];
    const thirdImage = imageFile[2];

    setIsLoading(true);

    if (isEdit) {
      editEvent({
        id: event?.id,
        title: watch('title'),
        description: watch('description'),
        unlimitedTickets: watch('unlimitedTickets') || false,
        numberOfTickets: watch('numberOfTickets') as number,
        aboutOrganizer: watch('aboutOrganizer'),
        eventUrl: watch('eventUrl'),
        price: Number(watch('ticketPrice')),
        type: watch('eventType'),
      } as Event)
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
      return;
    }

    const eventInfo = {
      title,
      description,
      eventType,
      aboutOrganizer,
      unlimitedTickets,
      eventUrl,
      location,
      eventFormat,
      date,
      organizers,
      numberOfTickets: +(formattedNumberOfTickets || 0),
      ticketPrice: +formattedPrice,
      phoneNumber: formatPhoneNumberFromMask(phoneNumber),
    } as unknown as CreateEventFormValues;

    createEvent(eventInfo, firstImage, secondImage, thirdImage)
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
    getFormData({
      title,
      eventTypeName,
      ticketPrice,
      freeTickets,
      isOffline,
      location,
      day: date.day,
      time: date.time,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    eventTypeName,
    ticketPrice,
    freeTickets,
    isOffline,
    location,
    date.day,
    date.time,
  ]);

  useEffect(() => {
    setValue('organizers.id', user.id);
  }, [setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PhotoCardList
        onPhotoChange={onPhotoChange}
        handleImageFileChange={handleImageFileChange}
        photos={photos}
        validateForm={validateForm}
        countOldPhotos={countOldPhotos}
      />
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
        trigger={trigger}
        isEdit={isEdit}
      />
      <TicketPrice
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        clearErrors={clearErrors}
        isEdit
      />
      <AboutOrganizer
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        agreement={agreement}
        checkAgreement={checkAgreement}
      />
      <div className="text-center">
        <SharedBtn
          disabled={!isValid || !validateForm || !agreement}
          type="submit"
          primary
          className="mt-8 bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] w-[230px] h-[48px]"
        >
          Створити подію
        </SharedBtn>
      </div>
      {isLoading && <Spinner />}
      {isSuccessPopupShown && popupEvent && (
        <PopupEventCreated event={popupEvent} />
      )}
    </form>
  );
};

export default CreateEventForm;
