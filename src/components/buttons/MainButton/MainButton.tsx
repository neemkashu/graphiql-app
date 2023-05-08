import { MainButtonProps } from '@/components';
import classNames from 'classnames';
import styles from './MainButton.module.scss';

export const MainButton = ({ style, disabled, children, action }: MainButtonProps): JSX.Element => (
  <button
    className={classNames(styles.button, styles[style])}
    onClick={action ? (): void => action() : undefined}
    disabled={disabled}
  >
    {children}
  </button>
);
