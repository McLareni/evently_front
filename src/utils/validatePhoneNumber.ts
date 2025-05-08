export const validatePhoneNumber = (value: string) => {
  if (value.length !== 17) return 'Введіть номер телефону';

  if (value.length === 17) {
    if (value[4] !== '0' || value[5] === '0') {
      return 'Введіть дійсний код українських операторів';
    }
    if (value.includes('000-00-00')) {
      return 'Введіть правильний номер телефону';
    }
  }
};
