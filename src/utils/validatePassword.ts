export const validatePassword = (password: string): boolean | string => {
  // @$!%*?&.
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

  if (!pattern.test(password)) {
    return 'Невірний пароль';
  }

  return true;
};
