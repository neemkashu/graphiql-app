'use client';

import styles from './AuthContainer.module.scss';
import Link from 'next/link';
import { PageList } from '@/common';
import { LoginForm } from '@/components/auth/forms/Login/LoginForm';
import { RegisterForm } from '@/components/auth/forms/Register/RegisterForm';
import { useTranslations } from 'next-intl';

export const AuthContainer = ({ hasAccount }: { hasAccount: boolean }): JSX.Element => {
  const t = useTranslations('Form');

  return hasAccount ? (
    <div className={styles.container}>
      <h2>{t('signIn')}</h2>
      {<LoginForm />}
      <p className={styles.question}>
        <span>{t('noAccount')}</span>
        <Link href={PageList.signUp} className={styles.link}>
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
        <Link href={PageList.signIn} className={styles.link}>
          {t('signIn')}
        </Link>
      </p>
    </div>
  );
};
