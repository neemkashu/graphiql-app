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
import { DEFAULT_REGISTER_STATE } from '@/components/auth/forms/forms.const';
import { RegisterValidationConfig } from '@/components/auth/forms/forms.config';
import { useTranslations } from 'next-intl';
import { usePathWithLocale } from '@/common/hook';
import { FirebaseErrorMessage } from '@/components/auth/FirebaseError/FirebaseErrorMessage';

export const RegisterForm = (): JSX.Element => {
  const [playgroundPage] = usePathWithLocale([PageList.playground]);
  const [createUserWithEmailAndPassword, user, loading, firebaseError] =
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
  const t = useTranslations('Form');

  useEffect((): void => {
    if (loading) return;
    if (user) router.push(playgroundPage);
  }, [user, loading, router, playgroundPage]);

  const handleRegister = async ({ email, password }: RegisterData): Promise<void> => {
    await createUserWithEmailAndPassword(email, password);
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
