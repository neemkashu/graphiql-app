import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';

export default function SignIn(): JSX.Element {
  return (
    <div className={styles.page}>
      <div className={styles.blur} />
      <AuthContainer hasAccount />
    </div>
  );
}
