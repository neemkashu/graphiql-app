'use client';
import { PageList } from '@/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './LoginNavButtons.module.scss';
import { usePathWithLocale } from '@/common/hook';

export const LoginNavButtons = (): JSX.Element => {
  const pathName = usePathname();
  const [signUpPage, signInPage] = usePathWithLocale([PageList.signUp, PageList.signIn]);
  const isSignUpPage = (): boolean => pathName.includes(PageList.signUp);
  const t = useTranslations('Header');

  return (
    <>
      <Link
        href={signUpPage}
        className={isSignUpPage() ? styles.activeButton : styles.normalButton}
        prefetch={false}
      >
        {t('signUp')}
      </Link>
      <Link
        href={signInPage}
        className={isSignUpPage() ? styles.normalButton : styles.activeButton}
        prefetch={false}
      >
        {t('signIn')}
      </Link>
    </>
  );
};
