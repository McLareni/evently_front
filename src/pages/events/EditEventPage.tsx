import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useLazyGetEventByIdQuery } from '@/redux/events/operations';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

import { FormaDataForCard } from './CreateEventPage';

const EditEventPage: React.FC = () => {
  const { idEvent } = useParams();
  const [loadEvent, { data: event }] = useLazyGetEventByIdQuery();
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [countOldPhotos, setCountOldPhotos] = useState<number>(0);
  const [eventInfoData, setEventInfoData] = useState<FormaDataForCard>({
    title: '',
    eventTypeName: '',
    ticketPrice: '',
    freeTickets: false,
    isOffline: true,
    location: {
      city: '',
      street: '',
      venue: '',
      latitude: '',
      longitude: '',
    },
    day: '',
    time: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const response = loadEvent(idEvent || '');
      const event = (await response).data;
      setEventInfoData({
        title: event?.title || '',
        eventTypeName: event?.type || '',
        ticketPrice: event?.price.toString() || '',
        freeTickets: event?.price === 0,
        isOffline: !event?.eventUrl,
        location: event ? { ...event.location } : undefined,
        day: event?.date.day || '',
        time: event?.date.time || '',
      });
      console.log(await response);

      setPhotos(event?.images.map(img => img.url) || []);
      setCountOldPhotos(event?.images.length || 0);
    };

    fetchEvent();
  }, [idEvent, event]);

  const getFormData = ({
    title,
    eventTypeName,
    ticketPrice,
    freeTickets,
    isOffline,
    location,
    day,
    time,
  }: FormaDataForCard) => {
    setEventInfoData({
      title,
      eventTypeName,
      ticketPrice,
      freeTickets,
      isOffline,
      location,
      day,
      time,
    });
  };

  const handlePhotoChange = (id: number, photo: string | null) => {
    setPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[id] = photo;
      return updatedPhotos;
    });
  };

  return (
    <>
      <Container className="flex flex-col gap-16 pb-16">
        <div>
          <h1 className=" content-center text-center bg-[url('/images/heroForCreatEventForm.svg')]  w-[1320px] h-[223px]">
            <span className="bg-gradient-to-r from-[#12C2E9] to-[#C471ED] bg-clip-text text-transparent">
              Твій івент - твоя історія!
            </span>
          </h1>
        </div>
        <div className="flex gap-6">
          <CreateEventCard photo={photos[0]} eventInfoData={eventInfoData} />
          <CreateEventForm
            isEdit
            countOldPhotos={countOldPhotos}
            event={event}
            photos={photos}
            onPhotoChange={handlePhotoChange}
            getFormData={getFormData}
          />
        </div>
      </Container>
    </>
  );
};

export default EditEventPage;
