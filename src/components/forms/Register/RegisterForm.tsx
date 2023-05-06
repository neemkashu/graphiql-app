import { useState } from 'react';

export const RegisterForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (): void => {
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
