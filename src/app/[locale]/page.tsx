import styles from './page.module.scss';
import { Team } from '@/components/welcome/Team';
import { Info } from '@/components/welcome/Info';
import { Features } from '@/components/welcome/Features/Features';

export default function WelcomePage(): JSX.Element {
  return (
    <section className={styles.page}>
      <Info />
      <Features />
      <Team />
    </section>
  );
}
