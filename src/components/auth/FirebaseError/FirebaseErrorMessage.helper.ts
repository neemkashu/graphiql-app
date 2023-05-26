import { AuthErrorMessages } from '@/components/auth/forms/forms.const';
import { AuthError } from 'firebase/auth';
import { FirestoreError } from 'firebase/firestore';
import { toast } from 'react-toastify';

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
