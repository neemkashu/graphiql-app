'use client';

import { FormEventHandler, useState } from 'react';

export const RegisterForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    // Register new user
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e): void => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e): void => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};
