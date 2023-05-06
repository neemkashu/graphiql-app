'use client';

import { FormEventHandler, useState } from 'react';
import styles from './LoginForm.module.scss';

export const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    // Register new user
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
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
      <button type="submit">Sign In</button>
    </form>
  );
};
