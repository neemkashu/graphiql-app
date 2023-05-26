import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (errors: string[]): void => {
  errors.forEach((error): void => {
    toast.error(error, {
      position: toast.POSITION.TOP_LEFT,
      draggable: false,
      toastId: error,
    });
  });
};

export const ResponseErrorToast = ({ errors }: { errors: string[] }): JSX.Element => {
  notify(errors);

  return <ToastContainer theme="dark" limit={3} autoClose={3000} />;
};
