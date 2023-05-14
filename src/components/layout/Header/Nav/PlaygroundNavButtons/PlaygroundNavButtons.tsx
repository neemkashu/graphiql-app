'use client';
import styles from './PlaygroundNavButtons.module.scss';
import { PageList } from '@/common';
import { logout } from '@/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathWithLocale } from '@/common/hook';
import { useTranslations } from 'next-intl';

export const PlaygroundNavButtons = (): JSX.Element => {
  const router = useRouter();
  const [welcomePage, playgroundPage] = usePathWithLocale([PageList.welcome, PageList.playground]);

  const onClickHandler = (): void => {
    logout();
    router.push(welcomePage);
  };
  const t = useTranslations('Header');

  return (
    <>
      <button className={styles.normalButton} onClick={onClickHandler}>
        {t('logOut')}
      </button>
      <Link href={playgroundPage} className={styles.activeButton} prefetch={false}>
        {t('playground')}
      </Link>
    </>
  );
};
