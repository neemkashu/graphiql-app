'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './LoginForm.module.scss';
import { firebaseAuth, logInWithEmailAndPassword } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';

export const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect((): void => {
    if (loading) {
      // here some spinner logic can be
      return;
    }
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event): Promise<void> => {
    event.preventDefault();
    await logInWithEmailAndPassword(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        className={styles.input}
        type="email"
        name="email"
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <label htmlFor="password">Password</label>
      <input
        className={styles.input}
        type="password"
        name="password"
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button className={styles.button} type="submit">
        Sign In
      </button>
    </form>
  );
};
