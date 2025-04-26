export const MAX_NAME_LENGTH = 15;

export const validateName = (name: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']+$/;

  const trimmedName = name.trim();

  if (!pattern.test(trimmedName) && trimmedName.length !== 0) {
    return 'Лише літери';
  }

  if (trimmedName.length < 2) {
    return `Ім'я має бути від 2 до ${MAX_NAME_LENGTH} символів`;
  }

  return true;
};

export const validateSurName = (surname: string) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']+$/;

  const trimmedSurname = surname.trim();

  if (!pattern.test(trimmedSurname) && trimmedSurname.length !== 0) {
    return 'Лише літери';
  }

  if (trimmedSurname.length > 0 && trimmedSurname.length < 2) {
    return `Прізвище має бути від 2 до ${MAX_NAME_LENGTH} символів`;
  }

  return true;
};
