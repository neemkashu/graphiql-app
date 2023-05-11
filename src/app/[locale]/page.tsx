import styles from './page.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { Team } from '@/components/welcome/Team';
import { Info } from '@/components/welcome/Info';
import Link from 'next/link';

export default function WelcomePage(): JSX.Element {
  const { lang } = useTranslation('common');
  return (
    <section className={styles.page}>

        {/* <Link href={`/playground?lang=${lang}`} as={`/${lang}/playground`}>
          ➡️
        </Link> */}

      <Info />
      <Team />
    </section>
  );
}
