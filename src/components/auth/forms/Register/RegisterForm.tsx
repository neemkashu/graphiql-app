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
import { RegisterValidationConfig } from '@/components/auth/forms/forms.helper';

export const RegisterForm = (): JSX.Element => {
  const [createUserWithEmailAndPassword, user, loading, error] =
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

  useEffect((): void => {
    if (loading) return;
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  const handleRegister = async ({ email, password }: RegisterData): Promise<void> => {
    await createUserWithEmailAndPassword(email, password);
  };

  return (
    <>
      {error && <p>{error?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label htmlFor={AuthInputNames.EMAIL}>Email</label>
          {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
        </div>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter email"
          {...register(AuthInputNames.EMAIL, RegisterValidationConfig[AuthInputNames.EMAIL])}
        />
        <div>
          <label htmlFor={AuthInputNames.PASSWORD}>Password</label>
          {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="Enter password"
          {...register(AuthInputNames.PASSWORD, RegisterValidationConfig[AuthInputNames.PASSWORD])}
        />
        <div>
          <label htmlFor={AuthInputNames.REPEAT_PASSWORD}>Confirm</label>
          {errors.repeatPassword && (
            <span className={styles.formError}>{errors.repeatPassword.message}</span>
          )}
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="Repeat password"
          {...register(
            AuthInputNames.REPEAT_PASSWORD,
            RegisterValidationConfig[AuthInputNames.REPEAT_PASSWORD](watch)
          )}
        />
        <button className={styles.button} type="submit">
          Create account
        </button>
      </form>
    </>
  );
};
