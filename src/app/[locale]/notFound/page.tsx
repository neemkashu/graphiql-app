'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CustomNotFoundPage(): JSX.Element {
  const t = useTranslations('NotFound');

  return (
    <section className={styles.page}>
      <div className={styles.imgWrapper}>
        <Image
          src={'/img/not-found.png'}
          alt="not found"
          width={500}
          height={330}
          priority
          className={`${styles.img}`}
        />
      </div>
      <h1 className={styles.title}>{t('title')}</h1>
      <div className={styles.subtitle}>{t('subtitle')}</div>
      <Link href="/" className={styles.link}>
        {t('link')}
      </Link>
    </section>
  );
}
