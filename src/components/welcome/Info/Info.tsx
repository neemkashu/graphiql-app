import Image from 'next/image';
import Link from 'next/link';
import styles from './Info.module.scss';

export const Info = (): JSX.Element => (
  <section className={styles.info}>
    <div className={styles.infoWrapper}>
      <h1 className={styles.title}>GraphQL Playground</h1>
      <Link href={'https://rickandmortyapi.com/'} target="blank" className={styles.api}>
        for The Rick and Morty API
      </Link>
      <p className={styles.descr}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur explicabo quaerat
        sequi accusantium tempore? Laborum, recusandae officiis quis sapiente quos laudantium porro
        sit exercitationem odit ad nisi consequatur facilis dolore!
      </p>
      <p className={styles.descr}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur explicabo quaerat
        sequi accusantium tempore? Laborum, recusandae officiis quis sapiente quos laudantium porro
        sit exercitationem odit ad nisi consequatur facilis dolore!
      </p>
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
