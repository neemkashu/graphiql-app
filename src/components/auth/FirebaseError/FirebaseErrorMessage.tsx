'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FirebaseErrorMessage = (): JSX.Element | null => {
  return <ToastContainer limit={3} theme="dark" />;
};
