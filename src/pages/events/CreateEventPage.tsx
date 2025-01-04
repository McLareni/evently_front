import { useState } from 'react';

import { Container } from '@/components/container/Container';
import CreateEventCard from '@/components/createEvent/CreateEventCard';
import CreateEventForm from '@/components/createEvent/createEventForm/CreateEventForm';

// import  hero  from "/images/heroForCreatEventForm.svg"

const CreateEventPage: React.FC = () => {
  // const [categorie, setCategorie] = useState<string>("Категорія")
  const [eventName, setEventName] = useState<string>('Назва події');
  const [date, setDate] = useState<string>('');
  // const [place, setPlace] = useState<string>("Місце")
  const [price, setPriece] = useState<string>('Ціна');

  // const handleCategorieChange = (newCategorie: string) => {
  //     setCategorie(newCategorie);
  //   };
  const handleEventNameChange = (newName: string) => {
    setEventName(newName);
  };
  console.log(date);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  //   const handlePlaceChange = (newPlace: string) => {
  //     setPlace(newPlace);
  //   };
  const handlePriceChange = (newPrice: string) => {
    setPriece(newPrice);
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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
            price={price}
            photo={photos[0]}
            category={selectedCategory}
            date={date}
          />
          <CreateEventForm
            eventName={eventName}
            photos={photos}
            price={price}
            date={date}
            onEventNameChange={handleEventNameChange}
            onCategoryChange={setSelectedCategory}
            onPriceChange={handlePriceChange}
            onPhotoChange={handlePhotoChange}
            handleDateChange={handleDateChange}
          />
        </div>
      </Container>
    </>
  );
};

export default CreateEventPage;
