import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import styles from './Info.module.scss';

export const Info = (): JSX.Element => {
  const { t } = useTranslation('welcome');
  return (
    <section className={styles.info}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{t('info-title')}</h1>
        <Link href={'https://rickandmortyapi.com/'} target="blank" className={styles.api}>
          {t('info-api')}
        </Link>
        <p className={styles.descr}>{t('info-sub-title')}</p>
        <p className={styles.descr}>{t('info-sub-title')}</p>
      </div>
      <div className={styles.imgWrapper}>
        <div className={styles.blur} />
        <div className={styles.blur} />
        <div className={styles.blur} />
        <Image
          src={'/img/welcome.webp'}
          alt="rick and morty"
          quality={100}
          priority
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          className={`${styles.img}`}
        />
      </div>
    </section>
  );
};
