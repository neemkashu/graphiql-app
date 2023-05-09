import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Custom404Page(): JSX.Element {
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
      <h1 className={styles.title}>Page Not Found</h1>
      <div className={styles.subtitle}>The page you're looking for does not seem to exist </div>
      <Link href="/" className={styles.link}>
        Go back to the main page
      </Link>
    </section>
  );
}
