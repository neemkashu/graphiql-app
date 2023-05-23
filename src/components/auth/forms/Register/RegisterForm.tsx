'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { firebaseAuth, writeNewUserPlayground } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';
import { useForm } from 'react-hook-form';
import { LoginData, RegisterData } from '@/components/auth/forms/forms.type';
import { AuthInputNames } from '@/components/auth/forms/forms.enum';
import { DEFAULT_REGISTER_STATE } from '@/components/auth/forms/forms.const';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { useTranslations } from 'next-intl';
import { usePathWithLocale } from '@/common/hook';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Spinner } from '@/components/loading';
import classNames from 'classnames';
import ClientOnlyPortal from '@/components/toasts/ClientOnlyPortal/ClientOnlyPortal';
import { notify } from '@/components/auth';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await writeNewUserPlayground(userCredential.user);
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
            t('button')
          )}
        </button>
      </form>
    </>
  );
};
