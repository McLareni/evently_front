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
    latitude: string;
    longitude: string;
  };
  organizers: User[];
  rating: number;
  eventUrl: string | null;
  eventStatus: 'PENDING' | 'APPROVED' | 'CANCELLED';
  APPROVED;
  CANCELLED;
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

interface EventPlaceWithGps {
  formatted: string;
  lat: number;
  lng: number;
  name: string;
  city: string;
}
