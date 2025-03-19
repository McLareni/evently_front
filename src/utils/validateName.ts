export const validateName = (name: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/;

  if (!pattern.test(name)) {
    return 'Лише літери';
  }

  const IsValidName =
    name.length > 40 || name.length < 3
      ? "Ім'я має бути від 3 до 40 символів"
      : true;

  return IsValidName;
};
