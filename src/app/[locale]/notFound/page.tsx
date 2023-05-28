'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import classNames from 'classnames';

export default function CustomNotFoundPage(): JSX.Element {
  const t = useTranslations('NotFound');
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <section className={styles.page}>
      <div className={styles.imgWrapper}>
        <Image
          className={classNames(styles.img, isImgLoaded ? styles.active : null)}
          src={'/img/not-found.png'}
          alt="not found"
          width={500}
          height={330}
          priority
          onLoadingComplete={() => setIsImgLoaded(true)}
        />
      </div>
      <h2 className={styles.title}>{t('title')}</h2>
      <div className={styles.subtitle}>{t('subtitle')}</div>
      <Link href="/" className={styles.link}>
        {t('link')}
      </Link>
    </section>
  );
}
