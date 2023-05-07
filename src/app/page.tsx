import styles from './page.module.scss';
import { Team } from '@/components/welcome';

export default function WelcomePage(): JSX.Element {
  return (
    <section className={styles.page}>
      <Team />
    </section>
  );
}
