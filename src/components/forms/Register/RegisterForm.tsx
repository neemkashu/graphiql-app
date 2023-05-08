'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth, registerWithEmailAndPassword } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageList } from '@/common';

export const RegisterForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('kT');
  const [user, loading, error] = useAuthState(firebaseAuth);
  const router = useRouter();

  const handleRegister: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect((): void => {
    if (loading) return;
    if (user) router.push(PageList.playground);
  }, [user, loading, router]);

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <button type="submit">Create account</button>
    </form>
  );
};
