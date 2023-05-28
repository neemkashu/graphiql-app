'use client';

import { useState } from 'react';
import styles from './LoginForm.module.scss';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PageList } from '@/common';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { LoginData } from '@/components/auth/forms/forms.type';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { useTranslations } from 'next-intl';
import { usePathWithLocale } from '@/common/hook';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { notify } from '@/components/auth';
import ClientOnlyPortal from '@/components/toasts/ClientOnlyPortal/ClientOnlyPortal';
import classNames from 'classnames';
import { Spinner } from '@/components';

export const LoginForm = (): JSX.Element => {
  const [playgroundPage] = usePathWithLocale([PageList.playground]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onSubmit', reValidateMode: 'onBlur' });
  const t = useTranslations('Form');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push(playgroundPage);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) notify(error);
    }
  };

  return (
    <>
      <ClientOnlyPortal>
        <FirebaseErrorMessage />
      </ClientOnlyPortal>

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
        <button
          disabled={isLoading}
          className={classNames(styles.button, isLoading && styles.loading)}
          type="submit"
        >
          {isLoading ? (
            <div className={styles.spinnerWrap}>
              <Spinner isSmall={true} />
            </div>
          ) : (
            t('signIn')
          )}
        </button>
      </form>
    </>
  );
};
