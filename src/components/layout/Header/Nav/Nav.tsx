'use client';

import { useIdToken } from 'react-firebase-hooks/auth';
import { LoginNavButtons } from './LoginNavButtons/LoginNavButtons';
import styles from './Nav.module.scss';
import { PlaygroundNavButtons } from './PlaygroundNavButtons/PlaygroundNavButtons';
import { firebaseAuth } from '@/firebase';
import { useRef, useEffect } from 'react';
import { DEFAULT_MAX_HEADER_RERENDERS } from '@/common';
import { Spinner } from '@/components';

export const Nav = ({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element => {
  const [user, loading] = useIdToken(firebaseAuth);
  const renderCountRef = useRef(0);

  useEffect((): void => {
    renderCountRef.current += 1;
  });

  if (typeof window === 'undefined') {
    return (
      <nav className={styles.nav}>
        {isLoggedIn ? <PlaygroundNavButtons /> : <LoginNavButtons />}
      </nav>
    );
  }

  if (
    renderCountRef.current <
    Number(process.env.NEXT_PUBLIC_RERENDERS_AMOUNT ?? DEFAULT_MAX_HEADER_RERENDERS)
  ) {
    return (
      <nav className={styles.nav}>
        {isLoggedIn ? <PlaygroundNavButtons /> : <LoginNavButtons />}
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      {loading ? <Spinner isSmall /> : user ? <PlaygroundNavButtons /> : <LoginNavButtons />}
    </nav>
  );
};
