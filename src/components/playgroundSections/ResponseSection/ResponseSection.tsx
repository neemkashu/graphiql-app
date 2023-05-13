import styles from './ResponseSection.module.scss';

export const ResponseSection = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <textarea className={styles.textarea} autoCorrect="off" spellCheck={false} disabled />
    </section>
  );
};
