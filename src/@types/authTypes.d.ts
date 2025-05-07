interface LoginUser {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterFormInputEmail {
  email: string;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
}
interface RegisterFormInputsPassword {
  name: string;
  password: string;
  confirmPassword: string;
}

interface RequiredPassword {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
