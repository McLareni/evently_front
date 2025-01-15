import { useState } from 'react';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

// import  hero  from "/images/heroForCreatEventForm.svg"

const CreateEventPage: React.FC = () => {
  // const [categorie, setCategorie] = useState<string>("Категорія")
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [eventName, setEventName] = useState('');
  const [eventType, seteventType] = useState('');
  const [date, setDate] = useState<string>('');
  const [place, setPlace] = useState<EventPlaceWithGps | null>(null);
  const [price, setPriece] = useState('Ціна');
  const [startTimeOption, setSelectedStartTimeOption] = useState('');
  


  const handleEventNameChange = (newName: string) => {
    setEventName(newName);
  };
  const handleCategoryChange = (eventType: string) => {
    seteventType(eventType);
  };
  
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };
  const handlePlaceChange = (newPlace: EventPlaceWithGps) => {
    setPlace(newPlace);
  };
  const handlePriceChange = (newPrice: string) => {
    setPriece(newPrice);
  };
  // const handleFormatChange = (format: string) => {
  //   setFormat(format);
  // };
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
            eventName={eventName}
            eventType={eventType}
            price={price}
            photo={photos[0]}
            date={date}
            place={place}
            startTimeOption={startTimeOption}
          />
          <CreateEventForm
            place={place}
            photos={photos}
            eventName={eventName}
            eventType={eventType}
            price={price}
            date={date}
            startTimeOption={startTimeOption}
            onEventNameChange={handleEventNameChange}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onPhotoChange={handlePhotoChange}
            onPlaceChange={handlePlaceChange}
            handleDateChange={handleDateChange}
            handleStartTime={handleStartTime}
          />
        </div>
      </Container>
    </>
  );
};

export default CreateEventPage;
