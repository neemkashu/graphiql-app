'use client';

import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from './LoginForm.module.scss';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';
import { useForm } from 'react-hook-form';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData } from '@/components/auth/forms/forms.type';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { useTranslations } from 'next-intl';

export const LoginForm = (): JSX.Element => {
  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(firebaseAuth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onSubmit', reValidateMode: 'onBlur' });
  const t = useTranslations('Form');

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
      {firebaseError && <p>{firebaseError?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor={AuthInputNames.EMAIL}>
              {t('form-email')}
            </label>
            {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
          </div>
          <input
            className={styles.input}
            type="email"
            placeholder={t('form-email-placeholder')}
            {...register(AuthInputNames.EMAIL, RegisterValidationConfig[AuthInputNames.EMAIL])}
          />
        </div>
        <div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor={AuthInputNames.PASSWORD}>
              {t('form-password')}
            </label>
            {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('form-password-placeholder')}
            {...register(AuthInputNames.PASSWORD, {
              required: t('form-password-message'),
            })}
          />
        </div>
        <button className={styles.button} type="submit">
          {t('form-sign-in')}
        </button>
      </form>
    </>
  );
};
