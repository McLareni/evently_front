interface User {
  id: string;

  name: string;
  surname: string;
  birthdayDate: string;
  phoneNumber: string;
  image: string | File;

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
