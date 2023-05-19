import { AuthErrorMessages } from '@/components/auth/forms/forms.const';
import { AuthError } from 'firebase/auth';
import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (error: AuthError): void => {
  toast.error(AuthErrorMessages[error.code], {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const FirebaseErrorMessage = ({ error }: { error: AuthError }): JSX.Element => {
  if (error) notify(error);

  return createPortal(<ToastContainer theme="dark" />, document.body);
};
