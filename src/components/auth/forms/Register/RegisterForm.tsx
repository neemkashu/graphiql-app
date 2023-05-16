'use client';

import { PageList, USER_TOKEN_KEY } from '@/common';
import { usePathWithLocale } from '@/common/hook';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { DEFAULT_REGISTER_STATE } from '@/components/auth/forms/forms.const';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData, RegisterData } from '@/components/auth/forms/forms.type';
import { firebaseAuth } from '@/firebase';
import {
  AuthError,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  Unsubscribe,
  User,
} from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.scss';

export const RegisterForm = (): JSX.Element => {
  const [playgroundPage] = usePathWithLocale([PageList.playground]);
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

  const handleRegister = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setFirebaseError(null);
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      router.push(playgroundPage);
    } catch (error) {
      setFirebaseError(error as AuthError);
    }
  };

  return (
    <>
      {firebaseError && <FirebaseErrorMessage error={firebaseError} />}
      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
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
            <label htmlFor={AuthInputNames.PASSWORD}>{t('password')}</label>
            {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('passwordPlaceholder')}
            {...register(
              AuthInputNames.PASSWORD,
              RegisterValidationConfig[AuthInputNames.PASSWORD](t)
            )}
          />
        </div>
        <div>
          <div className={styles.labelContainer}>
            <label htmlFor={AuthInputNames.REPEAT_PASSWORD}>{t('confirm')}</label>
            {errors.repeatPassword && (
              <span className={styles.formError}>{errors.repeatPassword.message}</span>
            )}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('confirmPlaceholder')}
            {...register(
              AuthInputNames.REPEAT_PASSWORD,
              RegisterValidationConfig[AuthInputNames.REPEAT_PASSWORD](watch, t)
            )}
          />
        </div>
        <button className={styles.button} type="submit">
          {t('button')}
        </button>
      </form>
    </>
  );
};