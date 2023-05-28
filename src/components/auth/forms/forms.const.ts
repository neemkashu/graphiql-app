import { RegisterData } from '@/components/auth/forms/forms.type';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

export const EMAIL_REGEX = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MAX_EMAIL_LENGTH = 320;
export const MIN_PASSWORD_LENGTH = 8;
export const ONE_LETTER = /.*[a-zA-Z].*/;
export const ONE_DIGIT = /.*\d.*/;
export const ONE_SPECIAL_CHAR = /.*[!@#$%^&*().,?":{}|<>`/ -'\\+].*/;

export const DEFAULT_REGISTER_STATE: RegisterData = { email: '', password: '', repeatPassword: '' };

export const AuthErrorMessages: Record<AuthError['code'], string> = {
  [AuthErrorCodes.WEAK_PASSWORD]: 'Make stronger password',
  [AuthErrorCodes.INVALID_EMAIL]: 'Email address is not valid',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Email is already in use',
  [AuthErrorCodes.USER_DELETED]: 'User not found',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Wrong password',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Too many requests, try later',
};
