'use client';

import syntaxPicture from './gifs/syntax.webp';
import errorPicture from './gifs/errors.webp';
import mobilePicture from './gifs/mobile.webp';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Features.module.scss';

export const Features = (): JSX.Element => {
  const t = useTranslations('Info');

  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{t('listHeader')}</h2>
      <ul className={styles.ul}>
        <li>
          <h3>✨ {t('syntax')}</h3>
          <div className={styles.imgWrapper}>
            <Image src={syntaxPicture} alt="" quality={90} priority className={styles.img} />
          </div>
        </li>
        <li>
          <h3>✨ {t('errors')}</h3>
          <div className={styles.imgWrapper}>
            <Image src={errorPicture} alt="" quality={90} priority className={styles.img} />
          </div>
        </li>
        <li>
          <h3>✨ {t('design')}</h3>
          <div className={styles.imgWrapper}>
            <Image src={mobilePicture} alt="" quality={90} priority className={styles.img} />
          </div>
        </li>
      </ul>
    </section>
  );
};
