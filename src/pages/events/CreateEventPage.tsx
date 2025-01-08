import { useState } from 'react';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

// import  hero  from "/images/heroForCreatEventForm.svg"

const CreateEventPage: React.FC = () => {
  // const [categorie, setCategorie] = useState<string>("Категорія")
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>('');
  const [place, setPlace] = useState<EventPlaceWithGps | null>(null);
  const [price, setPriece] = useState('Ціна');
  const [startTimeOption, setSelectedStartTimeOption] = useState('');
  const [endTimeOption, setSelectedEndTimeOption] = useState('');

  // const handleCategorieChange = (newCategorie: string) => {
  //     setCategorie(newCategorie);
  //   };
  const handleEventNameChange = (newName: string) => {
    setEventName(newName);
  };
  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };
  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };
  // const handleFormatChange = (format: string) => {
  //   setFormat(format);
  // };
 

  const handleStartTime = (startTime: string) => {
    setSelectedStartTimeOption(startTime);
  };
  const handleEndTime = (endTime: string) => {
    setSelectedEndTimeOption(endTime);
  };

  const handlePlaceChange = (newPlace: EventPlaceWithGps) => {
    setPlace(newPlace);
  };

  const handlePriceChange = (newPrice: string) => {
    setPriece(newPrice);
  };
  
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);

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
            category={category}
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
            description={description}
            category={category}
            price={price}
            date={date}
            startTimeOption={startTimeOption}
            endTimeOption={endTimeOption}
            onEventNameChange={handleEventNameChange}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onPhotoChange={handlePhotoChange}
            onPlaceChange={handlePlaceChange}
            onDescriptionChange={handleDescriptionChange}
            handleDateChange={handleDateChange}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
          />
        </div>
      </Container>
    </>
  );
};

export default CreateEventPage;
