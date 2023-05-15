'use client';

import { useEffect, useState } from 'react';
import styles from './LoginForm.module.scss';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PageList, USER_TOKEN_KEY } from '@/common';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData } from '@/components/auth/forms/forms.type';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { useTranslations } from 'next-intl';
import { usePathWithLocale } from '@/common/hook';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';
import { Unsubscribe, onIdTokenChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { AuthError, User } from 'firebase/auth';
import nookies from 'nookies';

export const LoginForm = (): JSX.Element => {
  const [playgroundPage] = usePathWithLocale([PageList.playground]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onSubmit', reValidateMode: 'onBlur' });
  const t = useTranslations('Form');

  const [, setUser] = useState<User | null>(null);
  const [firebaseError, setFirebaseError] = useState<AuthError | null>(null);

  useEffect((): Unsubscribe => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (user): Promise<void> => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        nookies.set(undefined, USER_TOKEN_KEY, token, { path: '/' });
      } else {
        setUser(null);
        nookies.set(undefined, USER_TOKEN_KEY, '', { path: '/' });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setFirebaseError(null);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push(playgroundPage);
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
              {t('email')}
            </label>
            {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
          </div>
          <input
            className={styles.input}
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register(AuthInputNames.EMAIL, RegisterValidationConfig[AuthInputNames.EMAIL](t))}
          />
        </div>
        <div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor={AuthInputNames.PASSWORD}>
              {t('password')}
            </label>
            {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('passwordPlaceholder')}
            {...register(AuthInputNames.PASSWORD, {
              required: t('passwordMessage'),
            })}
          />
        </div>
        <button className={styles.button} type="submit">
          {t('signIn')}
        </button>
      </form>
    </>
  );
};
