'use client';

import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from './LoginForm.module.scss';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, MAX_EMAIL_LENGTH } from '@/components/auth/forms/forms.const';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData } from '@/components/auth/forms/forms.type';

export const LoginForm = (): JSX.Element => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(firebaseAuth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onSubmit', reValidateMode: 'onBlur' });

  useEffect((): void => {
    if (loading) {
      // here some spinner logic can be
      return;
    }
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
    await signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      {error && <p>{error?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
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
          })}
        />
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </>
  );
};