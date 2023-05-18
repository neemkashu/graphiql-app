import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (errors: string[]): void => {
  errors.forEach((error): void => {
    toast.error(error, {
      position: toast.POSITION.TOP_LEFT,
      toastId: error,
    });
  });
};

export const PlaygroundToast = ({ errors }: { errors: string[] }): JSX.Element => {
  notify(errors);

  return createPortal(<ToastContainer theme="dark" limit={3} />, document.body);
};
