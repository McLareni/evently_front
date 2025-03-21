export const MAX_NAME_LENGTH = 15;

export const validateName = (name: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/;

  if (name.trim().length === 0) {
    return "Введіть ім'я";
  }

  if (!pattern.test(name)) {
    return 'Лише літери';
  }

  const IsValidName =
    name.trim().length < 2
      ? `Ім'я має бути від 2 до ${MAX_NAME_LENGTH} символів`
      : true;

  return IsValidName;
};
