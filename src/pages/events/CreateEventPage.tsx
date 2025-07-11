import { useState } from 'react';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

export interface FormaDataForCard {
  title: string;
  eventTypeName: string | undefined;
  ticketPrice: string;
  freeTickets: boolean;
  isOffline?: boolean;
  location?: CreateEventLocation;
  day: string;
  time: string;
}

const CreateEventPage: React.FC = () => {
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const { isMobile } = useMediaVariables();
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
      <Container className="flex flex-col gap-16 lg:pb-16 p-4">
        {!isMobile && (
          <div>
            <h1 className=" content-center text-center bg-[url('/images/heroForCreatEventForm.svg')]  w-[1320px] h-[223px]">
              <span className="bg-gradient-to-r from-[#12C2E9] to-[#C471ED] bg-clip-text text-transparent">
                Твій івент - твоя історія!
              </span>
            </h1>
          </div>
        )}
        <div className="flex gap-6">
          {!isMobile && (
            <CreateEventCard photo={photos[0]} eventInfoData={eventInfoData} />
          )}
          <CreateEventForm
            photos={photos}
            onPhotoChange={handlePhotoChange}
            getFormData={getFormData}
          />
        </div>
      </Container>
    </>
  );
};

export default CreateEventPage;
