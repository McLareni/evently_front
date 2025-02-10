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
  | 'image'
  | 'changePassword'
  | 'repeatPassword'
>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Image {
  id: {
    timestamp: number;
    date: Date;
  };
  photoInBytes: string;
  creationDate: Date;
  main: boolean;
}
