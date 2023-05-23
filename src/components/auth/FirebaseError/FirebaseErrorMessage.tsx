import { AuthErrorMessages } from '@/components/auth/forms/forms.const';
import { AuthError } from 'firebase/auth';
import { FirestoreError } from 'firebase/firestore';
import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (error: Error): void => {
  if (error instanceof FirestoreError) {
    toast.error(error.code, {
      position: toast.POSITION.TOP_LEFT,
    });
    return;
  }
  if ('code' in error) {
    const errorAuth = error as AuthError;
    toast.error(AuthErrorMessages[errorAuth.code], {
      position: toast.POSITION.TOP_LEFT,
    });
    return;
  }
  toast.error(error.message, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const FirebaseErrorMessage = (): JSX.Element => {
  return createPortal(<ToastContainer limit={3} theme="dark" />, document.body);
};
