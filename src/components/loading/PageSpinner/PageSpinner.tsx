import { Spinner } from '@/components/loading/Spinner/Spinner';
import styles from './PageSpinner.module.scss';

export const PageSpinner = ({ isSmall }: { isSmall?: boolean }): JSX.Element => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner isSmall={isSmall} />
    </div>
  );
};
