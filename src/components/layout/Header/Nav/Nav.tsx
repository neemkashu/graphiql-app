'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginNavButtons } from './LoginNavButtons/LoginNavButtons';
import styles from './Nav.module.scss';
import { PlaygroundNavButtons } from './PlaygroundNavButtons/PlaygroundNavButtons';
import { firebaseAuth } from '@/firebase';
import { Spinner } from '@/components/loading';
import { useRef, useEffect } from 'react';

export const Nav = ({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element => {
  const [user, loading] = useAuthState(firebaseAuth);
  const renderCountRef = useRef(0);

  useEffect((): void => {
    renderCountRef.current += 1;
    // console.log('Component rendered:', renderCountRef.current);
  });

  if (typeof window === 'undefined') {
    return (
      <nav className={styles.nav}>
        {isLoggedIn ? <PlaygroundNavButtons /> : <LoginNavButtons />}
      </nav>
    );
  }

  if (renderCountRef.current < 2) {
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
