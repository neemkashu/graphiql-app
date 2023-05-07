import styles from './HeaderLogo.module.scss';

export const HeaderLogo = (): JSX.Element => (
  <>
    <span className={styles.mainText}>GraphQL |</span>
    <span className={styles.secondText}> by No panic</span>
  </>
);
