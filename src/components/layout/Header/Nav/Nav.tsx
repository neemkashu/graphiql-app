'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginNavButtons } from './LoginNavButtons/LoginNavButtons';
import styles from './Nav.module.scss';
import { PlaygroundNavButtons } from './PlaygroundNavButtons/PlaygroundNavButtons';
import { firebaseAuth } from '@/firebase';
import { Spinner } from '@/components/Spinner/Spinner';

export const Nav = (): JSX.Element => {
  const [user, loading] = useAuthState(firebaseAuth);

  return (
    <nav className={styles.nav}>
      {loading ? <Spinner isSmall /> : user ? <PlaygroundNavButtons /> : <LoginNavButtons />}
    </nav>
  );
};
