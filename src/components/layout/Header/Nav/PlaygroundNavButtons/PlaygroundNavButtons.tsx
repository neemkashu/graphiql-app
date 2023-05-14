'use client';
import styles from './PlaygroundNavButtons.module.scss';

import { PageList } from '@/common';
import { logout } from '@/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const logOut = (): void => {
  logout();
};

export const PlaygroundNavButtons = (): JSX.Element => {
  const router = useRouter();

  const onClickHandler = (): void => {
    logOut();
    router.push(PageList.welcome);
  };
  return (
    <>
      <button className={styles.normalButton} onClick={onClickHandler}>
        Log out
      </button>
      <Link href={PageList.playground} className={styles.activeButton} prefetch={false}>
        Playground
      </Link>
    </>
  );
};
