import styles from './page.module.scss';

export default function WelcomePage(): JSX.Element {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Welcome page</h1>
    </section>
  );
}
