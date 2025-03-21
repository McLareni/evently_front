export const validateName = (name: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/;

  if (!pattern.test(name)) {
    return 'Лише літери';
  }

  const IsValidName =
    name.length < 2 ? "Ім'я має бути від 2 до 15 символів" : true;

  return IsValidName;
};
