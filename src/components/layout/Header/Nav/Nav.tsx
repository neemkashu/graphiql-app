import { LoginNavButtons } from './LoginNavButtons/LoginNavButtons';
import styles from './Nav.module.scss';
import { PlaygroundNavButtons } from './PlaygroundNavButtons/PlaygroundNavButtons';

const isUserLoggedIn = true;

export const Nav = (): JSX.Element => (
  <nav className={styles.nav}>
    {isUserLoggedIn ? (
      <PlaygroundNavButtons></PlaygroundNavButtons>
    ) : (
      <LoginNavButtons></LoginNavButtons>
    )}
  </nav>
);
