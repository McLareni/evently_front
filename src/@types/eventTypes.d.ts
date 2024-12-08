interface Event {
  category: 'TOP_EVENTS' | string | null;
  creationDate: Date;
  date: {
    day: string;
    time: string;
  };
  description: string;
  id: string;
  location: {
    city: string;
    street: string | null;
    venue: string | null;
  };
  numberOfTickets: number;
  organizers: User[];
  phoneNumber: string;
  photoUrl: string;
  price: number;
  rating: number;
  tickets: number;
  title: string;
  type: string;
}

// TODO
interface eventType {
  id: number;
  name: string;
  logo?: string;
  desc?: string;
  time: string;
  date: string;
  country: string;
  city: string;
  street: string;
  number: string;
  countSeats: number | 'Необмежено';
  schemaSeats: number | 'Не вибрано';
  library?: File[];
}
