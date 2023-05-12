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

export const RegisterForm = (): JSX.Element => {
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
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  const handleRegister = async ({ email, password }: RegisterData): Promise<void> => {
    await createUserWithEmailAndPassword(email, password);
  };

  return (
    <>
      {firebaseError && <p>{firebaseError?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
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
            <label htmlFor={AuthInputNames.PASSWORD}>{t('form-password')}</label>
            {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('form-password-placeholder')}
            {...register(
              AuthInputNames.PASSWORD,
              RegisterValidationConfig[AuthInputNames.PASSWORD]
            )}
          />
        </div>
        <div>
          <div className={styles.labelContainer}>
            <label htmlFor={AuthInputNames.REPEAT_PASSWORD}>{t('form-confirm')}</label>
            {errors.repeatPassword && (
              <span className={styles.formError}>{errors.repeatPassword.message}</span>
            )}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder={t('form-confirm-placeholder')}
            {...register(
              AuthInputNames.REPEAT_PASSWORD,
              RegisterValidationConfig[AuthInputNames.REPEAT_PASSWORD](watch)
            )}
          />
        </div>
        <button className={styles.button} type="submit">
          {t('form-button')}
        </button>
      </form>
    </>
  );
};
