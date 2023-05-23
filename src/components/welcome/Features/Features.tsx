'use client';
import { useTranslations } from 'next-intl';
import styles from './Features.module.scss';

export const Features = (): JSX.Element => {
  const t = useTranslations('Info');

  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{t('listHeader')}</h2>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <h3 className={styles.featureHeader}>{t('design')}</h3>
          <video className={styles.img} autoPlay loop muted>
            <source src="/video/docs3.webm" type="video/webm" />
            <source src="/video/docs3.mp4" type="video/mp4" />
          </video>
        </li>
        <li className={styles.li}>
          <h3 className={styles.featureHeader}>{t('design')}</h3>
          <video className={styles.img} autoPlay loop muted>
            <source src="/video/request3.webm" type="video/webm" />
            <source src="/video/request3.mp4" type="video/mp4" />
          </video>
        </li>
      </ul>
    </section>
  );
};
