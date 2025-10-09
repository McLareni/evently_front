import { CreateEventLocation } from './eventTypes';

interface CustomerInfo {
  userId: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  clientEmail: string;
}

interface ProductInfo {
  product: {
    productName: string;
    productPrice: string;
    productCount: string;
    amount: string;
  };
}

type FullTicketInfo = CustomerInfo & ProductInfo;

type ResponseWithSignature = {
  merchantAccount: string;
  merchantAuthType: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: string;
  amount: string;
  currency: string;
  orderTimeout: string;
  holdTimeout: string;
  product: {
    productName: string;
    productPrice: string;
    productCount: string;
    amount: string;
  };
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  defaultPaymentSystem: 'VISA';
  serviceUrl: string;
  merchantSignature: string;
};

type BuyTicketUser = Pick<
  User,
  'id' | 'name' | 'surname' | 'email' | 'phoneNumber'
>;

type Ticket = {
  date: {
    day: string;
    time: string;
    endTime: string;
  };
  eventFormat: string;
  eventId: string;
  eventUrl?: string;
  id: string;
  images: Image[];
  location: CreateEventLocation;
  orderDate: string;
  orderDetailsId: string;
  price: number;
  row: number | null;
  seat: number | null;
  status: string;
  ticketReference: string;
  title: string;
  userId: string;
};
