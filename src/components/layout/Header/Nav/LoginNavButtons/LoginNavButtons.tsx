'use client';
import { PageList } from '@/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './LoginNavButtons.module.scss';

export const LoginNavButtons = (): JSX.Element => {
  const pathName = usePathname();
  const isSignUpPage = (): boolean => pathName === PageList.signUp;
  const t = useTranslations('Header');

  return (
    <>
      <Link
        href={PageList.signUp}
        className={isSignUpPage() ? styles.activeButton : styles.normalButton}
      >
        {t('sign-up')}
      </Link>
      <Link
        href={PageList.signIn}
        className={isSignUpPage() ? styles.normalButton : styles.activeButton}
      >
        {t('sign-in')}
      </Link>
    </>
  );
};
