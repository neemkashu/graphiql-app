'use client';

import styles from './AuthContainer.module.scss';
import Link from 'next/link';
import { PageList } from '@/common';
import { LoginForm } from '@/components/auth/forms/Login/LoginForm';
import { RegisterForm } from '@/components/auth/forms/Register/RegisterForm';
import { useTranslations } from 'next-intl';
import { usePathWithLocale } from '@/common/hook';
import { redirect } from 'next/navigation';

export const AuthContainer = ({
  hasAccount,
  isLoggedIn,
}: {
  hasAccount: boolean;
  isLoggedIn: boolean;
}): JSX.Element => {
  const t = useTranslations('Form');
  const [signUpPage, signInPage, welcomePage] = usePathWithLocale([
    PageList.signUp,
    PageList.signIn,
    PageList.welcome,
  ]);

  if (isLoggedIn) redirect(welcomePage);

  return hasAccount ? (
    <div className={styles.container}>
      <h2>{t('signIn')}</h2>
      {<LoginForm />}
      <p className={styles.question}>
        <span>{t('noAccount')}</span>
        <Link href={signUpPage} className={styles.link} prefetch={false}>
          {t('signUp')}
        </Link>
      </p>
    </div>
  ) : (
    <div className={styles.container}>
      <h2>{t('signUp')}</h2>
      {<RegisterForm />}
      <p className={styles.question}>
        <span>{t('account')}</span>
        <Link href={signInPage} className={styles.link} prefetch={false}>
          {t('signIn')}
        </Link>
      </p>
    </div>
  );
};
