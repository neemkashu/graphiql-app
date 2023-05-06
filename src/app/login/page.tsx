import { AuthContainer } from '../../components/forms';
import styles from './page.module.scss';

export default function LoginPage(): JSX.Element {
  return (
    <section className={styles.page}>
      <AuthContainer />
    </section>
  );
}
