export const formatBirthDateToMask = (birthdayDate: string) => {
  if (birthdayDate.length === 0) {
    return '';
  }
  const dateToArray = birthdayDate.split('-').reverse().join('.');
  return dateToArray;
};

export const formatPhoneToMask = (phoneNumber: string) => {
  if (phoneNumber.length === 0) {
    return '';
  }
  const n = phoneNumber.split('');
  const maskedNumber = `+${n[0]}${n[1]}(${n[2]}${n[3]}${n[4]})${n[5]}${n[6]}${n[7]}-${n[8]}${n[9]}-${n[10]}${n[11]}`;
  return maskedNumber;
};
