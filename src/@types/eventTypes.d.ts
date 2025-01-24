interface Event {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  creationDate: Date;
  phoneNumber: string;
  location: {
    city: string;
    street: string | null;
    venue: string | null;
    latitude: string | null;
    longitude: string | null;
  };
  organizers: User;
  rating: number;
  eventStatus: 'PENDING' | 'APPROVED' | 'CANCELLED';
  eventUrl: string | null;
  images: string[];
  date: {
    day: string;
    time: string;
    endTime: string;
  };
  tickets: number;
  price: number;
  type: string;
  category: 'TOP_EVENTS' | 'POPULAR' | 'RECOMMENDED';

  // ?
  numberOfTickets: number;
}

interface EventDTO {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  creationDate: Date;
  phoneNumber: string;
  ticketPrice: number;
  numberOfTickets: number;
  availableTickets: number;
  location: {
    city: string;
    street: string | null;
    venue: string | null;
    latitude: string;
    longitude: string;
  };
  organizers: User[];
  eventUrl: string;
  eventStatus: 'PENDING' | 'APPROVED' | 'CANCELLED';
  deleted: boolean;
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
