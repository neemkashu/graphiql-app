'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Info.module.scss';
import { TECH_STACK_LINK } from '@/common';
import classNames from 'classnames';
import { useState } from 'react';

export const Info = (): JSX.Element => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const t = useTranslations('Info');
  return (
    <section className={styles.info}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{t('title')}</h1>
        <Link href={'https://rickandmortyapi.com/'} target="blank" className={styles.api}>
          {t('api')}
        </Link>
        <p className={styles.descr}>
          {t.rich('descriptionShort', {
            strong: (chunks) => <strong className={styles.strong}>{chunks}</strong>,
            link: (chunk) => (
              <a className={styles.techStackLink} href={TECH_STACK_LINK}>
                {chunk}
              </a>
            ),
          })}
        </p>
        <p className={styles.descr}>
          {t.rich('descriptionAdditional', {
            strong: (chunks) => <strong className={styles.strong}>{chunks}</strong>,
          })}
        </p>
      </div>
      <div className={styles.imgWrapper}>
        <div className={styles.blur} />
        <div className={styles.blur} />
        <div className={styles.blur} />
        <Image
          className={classNames(styles.img, isImgLoaded ? styles.active : null)}
          src={'/img/welcome.webp'}
          alt="rick and morty"
          quality={80}
          priority
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          onLoadingComplete={() => setIsImgLoaded(true)}
        />
      </div>
    </section>
  );
};
