import {
  MAX_EMAIL_LENGTH,
  EMAIL_REGEX,
  MIN_PASSWORD_LENGTH,
  ONE_LETTER,
  ONE_DIGIT,
  ONE_SPECIAL_CHAR,
} from '@/components/auth/forms/forms.const';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { RegisterData } from '@/components/auth/forms/forms.type';
import { UseFormWatch, RegisterOptions } from 'react-hook-form';

export const RegisterValidationConfig = {
  [AuthInputNames.EMAIL]: {
    required: 'Please enter email',
    maxLength: {
      value: MAX_EMAIL_LENGTH,
      message: `Email exceeded ${MAX_EMAIL_LENGTH} symbols`,
    },
    pattern: {
      value: EMAIL_REGEX,
      message: 'Invalid email',
    },
  },
  [AuthInputNames.PASSWORD]: {
    required: 'Please enter password',
    minLength: {
      value: MIN_PASSWORD_LENGTH,
      message: `At least ${MIN_PASSWORD_LENGTH} characters in length`,
    },
    validate: {
      oneLetter: (value: string): boolean | string =>
        ONE_LETTER.test(value) || 'At least one letter',
      oneDigit: (value: string): boolean | string => ONE_DIGIT.test(value) || 'At least one digit',
      oneSpecialChar: (value: string): boolean | string =>
        ONE_SPECIAL_CHAR.test(value) || 'At least one special character',
    },
  },
  [AuthInputNames.REPEAT_PASSWORD]: (
    watch: UseFormWatch<RegisterData>
  ): RegisterOptions<RegisterData, AuthInputNames.EMAIL> => {
    return {
      required: 'Please confirm your password',
      validate: {
        equalPassword: (value: string): boolean | string =>
          value === watch(AuthInputNames.PASSWORD) || 'Passwords do not match',
      },
    };
  },
};
