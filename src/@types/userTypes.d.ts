interface User {
  id: string;

  name: string;
  surname: string;
  birthday: string;
  phone: string;
  image: string | File;

  email: string;
  creationDate: Date;
  mailConfirmation: boolean;
  role: 'VISITOR' | 'ORGANIZER' | 'ADMIN';
  location: string;
  status: 'ACTIVE' | 'BANNED';
}

type UserInfo = Pick<User, 'name' | 'surname' | 'birthday' | 'phone' | 'image'>;
