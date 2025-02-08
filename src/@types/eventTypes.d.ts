interface Event {
  id: string;
  title: string;
  description: string;
  photoUrl: string | null;
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
  aboutOrganizer?: string;
  rating: number;
  eventStatus: 'PENDING' | 'APPROVED' | 'CANCELLED';
  eventUrl: string | null;
  images: { id: string; photoInBytes: string }[];
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
interface eventPhotos {
  firstImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
}
interface eventType {
  // id: number;
  // name: string;
  // logo?: string;
  // desc?: string;
  // time: string;
  // date: string;
  // country: string;
  // city: string;
  // street: string;
  // number: string;
  // countSeats: number | 'Необмежено';
  // schemaSeats: number | 'Не вибрано';
  // library?: File[];
  title: string;
  description: string;
  dateDetails?: {
    day: string;
    startTime: string;
    endTime: string;
  };
  ticketPrice: string | undefined;
  location?: {
    city?: string;
    street?: string;
    venue?: string;
    latitude?: string;
    longitude?: string;
  };
  // photos: photos;
  eventType?: string;
  numberOfTickets: number;
  eventUrl?: string;
  organizers: {
    id: string;
  };
}

interface EventPlaceWithGps {
  formatted: string;
  lat: number;
  lng: number;
  name: string;
  city: string;
}

// create event
type CreateEventLocation = {
  city: string;
  street: string;
  venue: string;
  latitude: string;
  longitude: string;
};

type CreateEventFormValues = {
  organizers: {
    id: string;
  };
  firstImg: string;
  secondImg: string;
  thirdImg: string;
  aboutOrganizer: string;
  unlimitedTickets?: boolean;
  title: string;
  description: string;
  eventType: string;
  eventTypeName?: string;
  startDate: string;
  startTime: string;
  endTime: string;
  ticketPrice: string;
  numberOfTickets: string;
  location: CreateEventLocation;
  eventUrl: string;
  freeTickets: boolean;
  isOffline?: boolean;
};
