import Link from 'next/link';
import styles from './HeaderLogo.module.scss';

export const HeaderLogo = (): JSX.Element => (
  <Link href={'/'} className={styles.logo}>
    <span className={styles.mainText}>GraphQL |</span>
    <span className={styles.secondText}> by No panic</span>
  </Link>
);
