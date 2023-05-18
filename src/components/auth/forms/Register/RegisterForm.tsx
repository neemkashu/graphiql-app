'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { firebaseAuth } from '@/firebase';
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
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';

export const RegisterForm = (): JSX.Element => {
  const [playgroundPage] = usePathWithLocale([PageList.playground]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_REGISTER_STATE,
  });
  const t = useTranslations('Form');

  const [firebaseError, setFirebaseError] = useState<AuthError | null>(null);

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
      {isValid && firebaseError && <FirebaseErrorMessage error={firebaseError} />}
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
