import styles from './page.module.scss';
import { Team } from '@/components/welcome/Team';
import { Info } from '@/components/welcome/Info';

export default function WelcomePage(): JSX.Element {
  return (
    <section className={styles.page}>
      <Info />
      <Team />
    </section>
  );
}
