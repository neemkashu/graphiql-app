'use client';

import { useState } from 'react';
import { DEFAULT_AUTH_STATUS } from './constants';
import { LoginForm } from '../Login/LoginForm';
import { RegisterForm } from '../Register/RegisterForm';
import styles from './AuthContainer.module.scss';

export const AuthContainer = (): JSX.Element => {
  const [hasAccount, setHasAccount] = useState(DEFAULT_AUTH_STATUS);

  const handleChangeAuth = (): void => {
    setHasAccount((prevoius): boolean => !prevoius);
  };

  return (
    <div className={styles.container}>
      <h2>{hasAccount ? 'Sign in' : 'Register'}</h2>
      {hasAccount ? <LoginForm /> : <RegisterForm />}
      <p>
        <span>{hasAccount ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
        <a href="#" onClick={handleChangeAuth}>
          {hasAccount ? 'Sign up' : 'Sign in'}
        </a>
      </p>
    </div>
  );
};
