'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginNavButtons } from './LoginNavButtons/LoginNavButtons';
import styles from './Nav.module.scss';
import { PlaygroundNavButtons } from './PlaygroundNavButtons/PlaygroundNavButtons';
import { firebaseAuth } from '@/firebase';

export const Nav = (): JSX.Element => {
  const [user] = useAuthState(firebaseAuth);
  const showPlayground = true;

  return (
    <nav className={styles.nav}>
      {showPlayground ? <PlaygroundNavButtons /> : <LoginNavButtons />}
    </nav>
  );
};
