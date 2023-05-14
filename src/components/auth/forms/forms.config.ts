import {
  MAX_EMAIL_LENGTH,
  EMAIL_REGEX,
  MIN_PASSWORD_LENGTH,
  ONE_LETTER,
  ONE_DIGIT,
  ONE_SPECIAL_CHAR,
} from '@/components/auth/forms/forms.const';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData, RegisterData } from '@/components/auth/forms/forms.type';
import { UseFormWatch, RegisterOptions } from 'react-hook-form';
import { Formats, TranslationValues } from 'next-intl';

type Translate = {
  <TargetKey>(
    key: TargetKey,
    values?: TranslationValues | undefined,
    formats?: Partial<Formats> | undefined
  ): string;
};

export const RegisterValidationConfig = {
  [AuthInputNames.EMAIL]: (t: Translate): RegisterOptions<LoginData, AuthInputNames.EMAIL> => {
    return {
      required: t('validation.requireEmail'),
      maxLength: {
        value: MAX_EMAIL_LENGTH,
        message: t('validation.maxEmailLength', { MAX_EMAIL_LENGTH }),
      },
      pattern: {
        value: EMAIL_REGEX,
        message: t('validation.validEmail'),
      },
    };
  },
  [AuthInputNames.PASSWORD]: (t: Translate): RegisterOptions<LoginData, AuthInputNames.EMAIL> => {
    return {
      required: t('validation.requirePassword'),
      minLength: {
        value: MIN_PASSWORD_LENGTH,
        message: t('validation.minLength', { MIN_PASSWORD_LENGTH }),
      },
      validate: {
        oneLetter: (value: string): boolean | string =>
          ONE_LETTER.test(value) || t('validation.requireLetter'),
        oneDigit: (value: string): boolean | string =>
          ONE_DIGIT.test(value) || t('validation.requireDigit'),
        oneSpecialChar: (value: string): boolean | string =>
          ONE_SPECIAL_CHAR.test(value) || t('validation.requireChar'),
      },
    };
  },
  [AuthInputNames.REPEAT_PASSWORD]: (
    watch: UseFormWatch<RegisterData>,
    t: Translate
  ): RegisterOptions<RegisterData, AuthInputNames.EMAIL> => {
    return {
      required: t('validation.confirmPassword'),
      validate: {
        equalPassword: (value: string): boolean | string =>
          value === watch(AuthInputNames.PASSWORD) || t('validation.equalPasswords'),
      },
    };
  },
};
