'use client';

import { ToastContainer } from 'react-toastify';

export const FirebaseErrorMessage = (): JSX.Element | null => {
  return <ToastContainer limit={3} theme="dark" />;
};
