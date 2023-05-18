'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Info.module.scss';

export const Info = (): JSX.Element => {
  const t = useTranslations('Info');
  return (
    <section className={styles.info}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{t('title')}</h1>
        <Link href={'https://rickandmortyapi.com/'} target="blank" className={styles.api}>
          {t('api')}
        </Link>
        <p className={styles.descr}>{t('subtitle')}</p>
        <p className={styles.descr}>{t('subtitle')}</p>
      </div>
      <div className={styles.imgWrapper}>
        <div className={styles.blur} />
        <div className={styles.blur} />
        <div className={styles.blur} />
        <Image
          src={'/img/welcome.webp'}
          alt="rick and morty"
          quality={90}
          priority
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
        />
      </div>
    </section>
  );
};
