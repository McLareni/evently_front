import { useState } from 'react';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

const CreateEventPage: React.FC = () => {
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [date, setDate] = useState<string>('');
  const [place, setPlace] = useState<EventPlaceWithGps | null>(null);
  const [startTimeOption, setSelectedStartTimeOption] = useState('');
  const [isOffline, setIsOffline] = useState(true);

  const [eventInfoData, setEventInfoData] = useState({
    title: '',
    eventTypeName: '',
    ticketPrice: '',
    freeTickets: false,
  });

  const getFormData = ({
    title,
    eventTypeName,
    ticketPrice,
    freeTickets,
  }: typeof eventInfoData) => {
    setEventInfoData({ title, eventTypeName, ticketPrice, freeTickets });
  };

  const toggleOfflineOnline = (value: boolean) => {
    setIsOffline(value);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  const handlePlaceChange = (newPlace: EventPlaceWithGps) => {
    setPlace(newPlace);
  };

  const handleStartTime = (startTime: string) => {
    setSelectedStartTimeOption(startTime);
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
          <CreateEventCard
            photo={photos[0]}
            date={date}
            place={place}
            isOffline={isOffline}
            startTimeOption={startTimeOption}
            eventInfoData={eventInfoData}
          />
          <CreateEventForm
            toggleOfflineOnline={toggleOfflineOnline}
            place={place}
            photo={photos[0]}
            photos={photos}
            date={date}
            startTimeOption={startTimeOption}
            isOffline={isOffline}
            onPhotoChange={handlePhotoChange}
            onPlaceChange={handlePlaceChange}
            handleDateChange={handleDateChange}
            handleStartTime={handleStartTime}
            getFormData={getFormData}
          />
        </div>
      </Container>
    </>
  );
};

export default CreateEventPage;
