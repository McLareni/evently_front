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
  const date = new Date(formatBirthDateFromMask(value));
  try {
    date.toISOString();
    if (new Date(date.toISOString()) > new Date()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
