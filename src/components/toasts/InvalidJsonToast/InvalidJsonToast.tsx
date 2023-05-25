import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const infoNotify = (info: string): void => {
  toast.info(info, {
    position: toast.POSITION.TOP_LEFT,
    toastId: info,
  });
};

export const InvalidJsonToast = ({ info }: { info: string }): JSX.Element => {
  if (info) infoNotify(info);

  return createPortal(<ToastContainer theme="dark" limit={3} />, document.body);
};
