export const MAX_NAME_LENGTH = 15;

export const validateName = (name: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']+$/;

  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return "Введіть ім'я";
  }

  if (!pattern.test(trimmedName)) {
    return 'Лише літери';
  }

  if (trimmedName.length < 2) {
    return `Ім'я має бути від 2 до ${MAX_NAME_LENGTH} символів`;
  }

  return true;
};

export const validateSurName = (surname: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']+$/;

  const trimmedName = surname.trim();

  if (!pattern.test(trimmedName) && trimmedName.length !== 0) {
    return 'Лише літери';
  }

  if (trimmedName.length > 0 && trimmedName.length < 2) {
    return `Прізвище має бути від 2 до ${MAX_NAME_LENGTH} символів`;
  }

  return true;
};
