import styles from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';

export const Header = (): JSX.Element => (
  <header className={styles.header}>
    <HeaderLogo></HeaderLogo>
  </header>
);
