export const formatPhoneNumberFromMask = (phoneNumber: string) => {
  if (phoneNumber.length === 0) {
    return '';
  }
  return phoneNumber.replace(/\D/g, '');
};

export const formatBirthDateFromMask = (data: string) => {
  const dateToArray = data.split('.').reverse().join('-');
  return dateToArray;
};

export const isValueDate = (value: string) => {
  const [day, month, year] = value.split('.').map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  if (date > new Date()) {
    return false;
  }

  return true;
};
