import { Spinner } from '@/components';
import styles from './PageSpinner.module.scss';

export const PageSpinner = (): JSX.Element => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner />
    </div>
  );
};
