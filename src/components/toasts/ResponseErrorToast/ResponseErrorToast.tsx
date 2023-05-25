import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (errors: string[]): void => {
  errors.forEach((error): void => {
    toast.error(error, {
      position: toast.POSITION.TOP_LEFT,
      toastId: error,
      containerId: 'B',
    });
  });
};

export const ResponseErrorToast = ({ errors }: { errors: string[] }): JSX.Element => {
  if (errors) notify(errors);

  return createPortal(
    <ToastContainer theme="dark" limit={3} enableMultiContainer containerId={'B'} />,
    document.body
  );
};
