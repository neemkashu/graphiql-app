'use client';

import { useEffect, useState } from 'react';
import styles from './LoginForm.module.scss';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData } from '@/components/auth/forms/forms.type';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';
import { Unsubscribe, onIdTokenChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { AuthError, User } from 'firebase/auth';
import nookies from 'nookies';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onSubmit', reValidateMode: 'onBlur' });

  const [, setUser] = useState<User | null>(null);
  const [firebaseError, setFirebaseError] = useState<AuthError | null>(null);

  useEffect((): Unsubscribe => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (user): Promise<void> => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, { path: '/' });
      } else {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setFirebaseError(null);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/playground');
    } catch (error) {
      setFirebaseError(error as AuthError);
    }
  };

  return (
    <>
      {firebaseError && <FirebaseErrorMessage error={firebaseError} />}
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor={AuthInputNames.EMAIL}>
              Email
            </label>
            {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
          </div>
          <input
            className={styles.input}
            type="email"
            placeholder="Enter email"
            {...register(AuthInputNames.EMAIL, RegisterValidationConfig[AuthInputNames.EMAIL])}
          />
        </div>
        <div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor={AuthInputNames.PASSWORD}>
              Password
            </label>
            {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder="Enter password"
            {...register(AuthInputNames.PASSWORD, {
              required: 'Enter your password',
            })}
          />
        </div>
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </>
  );
};
