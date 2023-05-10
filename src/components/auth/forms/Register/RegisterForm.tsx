'use client';

import { useEffect } from 'react';
import styles from './RegisterForm.module.scss';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';
import { useForm } from 'react-hook-form';
import { RegisterData } from '@/components/auth/forms/forms.type';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import {
  MAX_EMAIL_LENGTH,
  EMAIL_REGEX,
  ONE_LETTER,
  ONE_DIGIT,
  MIN_PASSWORD_LENGTH,
  ONE_SPECIAL_CHAR,
  DEFAULT_REGISTER_STATE,
} from '@/components/auth/forms/forms.const';

export const RegisterForm = (): JSX.Element => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(firebaseAuth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_REGISTER_STATE,
  });

  useEffect((): void => {
    if (loading) return;
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  const handleRegister = async ({ email, password }: RegisterData): Promise<void> => {
    const user = await createUserWithEmailAndPassword(email, password);
  };

  return (
    <>
      {error && <p>{error?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label htmlFor={AuthInputNames.EMAIL}>Email</label>
          {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
        </div>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter email"
          {...register(AuthInputNames.EMAIL, {
            required: 'Please enter email',
            maxLength: {
              value: MAX_EMAIL_LENGTH,
              message: `Email exceeded ${MAX_EMAIL_LENGTH} symbols`,
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email',
            },
          })}
        />
        <div>
          <label htmlFor={AuthInputNames.PASSWORD}>Password</label>
          {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="Enter password"
          {...register(AuthInputNames.PASSWORD, {
            required: 'Please enter password',
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: 'At least 8 characters in length',
            },
            validate: {
              oneLetter: (value): boolean | string =>
                ONE_LETTER.test(value) || 'At least one letter',
              oneDigit: (value): boolean | string => ONE_DIGIT.test(value) || 'At least one digit',
              oneSpecialChar: (value): boolean | string =>
                ONE_SPECIAL_CHAR.test(value) || 'At least one special character',
            },
          })}
        />
        <div>
          <label htmlFor={AuthInputNames.REPEAT_PASSWORD}>Confirm</label>
          {errors.repeatPassword && (
            <span className={styles.formError}>{errors.repeatPassword.message}</span>
          )}
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="Repeat password"
          {...register(AuthInputNames.REPEAT_PASSWORD, {
            required: 'Please confirm your password',
            validate: {
              equalPassword: (value): boolean | string =>
                value === watch(AuthInputNames.PASSWORD) || 'Passwords do not match',
            },
          })}
        />
        <button className={styles.button} type="submit">
          Create account
        </button>
      </form>
    </>
  );
};
