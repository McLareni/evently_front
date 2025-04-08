interface User {
  id: string;

  name: string;
  surname: string;
  birthdayDate: string;
  phoneNumber: string;
  avatarImage: Image;
  createdEvents: Event[];

  email: string;
  creationDate: Date;
  mailConfirmation: boolean;
  role: 'VISITOR' | 'ORGANIZER' | 'ADMIN';
  location: string;
  status: 'ACTIVE' | 'BANNED';

  changePassword: string;
  repeatPassword: string;
}

type UserInfo = Pick<
  User,
  | 'name'
  | 'surname'
  | 'birthdayDate'
  | 'phoneNumber'
  | 'changePassword'
  | 'repeatPassword'
>;

type BuyTicketUser = Pick<User, 'name' | 'surname' | 'email' | 'phoneNumber'>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Image {
  creationDate: string;
  id: string;
  main: boolean;
  name: string;
  url: string;
}
