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

const infoNotify = (info: string): void => {
  toast.info(info, {
    position: toast.POSITION.TOP_LEFT,
    toastId: info,
  });
};

export const PlaygroundToast = ({
  errors,
  info,
}: {
  errors?: string[];
  info?: string;
}): JSX.Element => {
  if (errors) notify(errors);
  if (info) infoNotify(info);

  return createPortal(<ToastContainer theme="dark" limit={3} />, document.body);
};
