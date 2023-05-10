import styles from './RoundButton.module.scss';
import { RoundButtonProps } from './RoundButton.type';

export const RoundButton = ({ action, children }: RoundButtonProps): JSX.Element => {
  return (
    <button className={styles.button} onClick={action}>
      {children}
    </button>
  );
};
