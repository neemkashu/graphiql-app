import { AuthErrorMessages } from '@/components/auth/forms/forms.const';
import { AuthError } from 'firebase/auth';
import { FirestoreError } from 'firebase/firestore';
import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (error: AuthError | FirestoreError): void => {
  if (error instanceof FirestoreError) {
    toast.error(error.code, {
      position: toast.POSITION.TOP_LEFT,
    });
    return;
  }

  toast.error(AuthErrorMessages[error.code], {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const FirebaseErrorMessage = ({
  error,
}: {
  error: AuthError | FirestoreError;
}): JSX.Element => {
  if (error) notify(error);

  return createPortal(<ToastContainer theme="dark" />, document.body);
};
