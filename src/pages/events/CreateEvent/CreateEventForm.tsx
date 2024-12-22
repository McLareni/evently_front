import { Container } from "@/components/container/Container"
import CreateEventCard from "./CreateEventCard"
import EventForm from "./EventForm"
import { useState } from "react"
// import  hero  from "../../../public/images/heroForCreatEventForm.svg"


const CreateEventForm: React.FC = () => {
    // const [categorie, setCategorie] = useState<string>("Категорія")
    const [eventName, setEventName] = useState<string>("Назва події")
    // const [date, setDate] = useState<string>("")
    // const [place, setPlace] = useState<string>("Місце")
    const [price, setPriece] = useState<string>("Ціна")

    // const handleCategorieChange = (newCategorie: string) => {
    //     setCategorie(newCategorie);
    //   };
      const handleEventNameChange = (newName: string) => {
        setEventName(newName);
      };
    //   const handleDateChange = (newDate: string) => {
    //     setDate(newDate);
    //   };
    //   const handlePlaceChange = (newPlace: string) => {
    //     setPlace(newPlace);
    //   };
      const handlePriceChange = (newPrice: string) => {
        setPriece(newPrice);
      };
                    

    return (<>
        <Container className="flex flex-col gap-16 pb-16">
                <div>
                    <h1 className="content-center text-center bg-[url('../../../public/images/heroForCreatEventForm.svg')]  w-[1320px] h-[223px]">Твій івент - твоя історія!</h1>
                </div>
                <div className="flex gap-6">
                        <CreateEventCard eventName={eventName}  price={price}/>
                        <EventForm eventName={eventName} price={price} onEventNameChange={handleEventNameChange}  onPriceChange={handlePriceChange}/>
                </div>
        </Container>
    </>)
}

export default CreateEventForm