import { RegisterData } from '@/components/auth/forms/forms.type';

export const EMAIL_REGEX = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MAX_EMAIL_LENGTH = 320;
export const MIN_PASSWORD_LENGTH = 8;
export const ONE_LETTER = /.*[a-zA-Z].*/;
export const ONE_DIGIT = /.*\d.*/;
export const ONE_SPECIAL_CHAR = /.*[!@#$%^&*().,?":{}|<>`/ ].*/;

export const DEFAULT_REGISTER_STATE: RegisterData = { email: '', password: '', repeatPassword: '' };
