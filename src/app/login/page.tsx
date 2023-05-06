import { AuthContainer } from '@/components/forms';
import styles from './page.module.scss';

export default function LoginPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <div className={styles.blur} />
      <section>
        <AuthContainer />
      </section>
    </div>
  );
}
