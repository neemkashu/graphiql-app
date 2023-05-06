import { useState } from 'react';
import { DEFAULT_AUTH_STATUS } from './constants';

export const AuthContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [hasAccount, setHasAccount] = useState(DEFAULT_AUTH_STATUS);

  const handleChangeAuth = (): void => {
    setHasAccount((prevoius): boolean => !prevoius);
  };

  return (
    <div>
      {children}
      <p>
        <span>{hasAccount ? "Don't have an account?" : 'Already have an account?'}</span>
        <a href="#" onClick={handleChangeAuth}>
          {hasAccount ? 'Sign up' : 'Sign in'}
        </a>
      </p>
    </div>
  );
};
