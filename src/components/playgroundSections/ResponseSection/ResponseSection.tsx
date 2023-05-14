import styles from './ResponseSection.module.scss';

export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>Response</button>}
      <textarea className={styles.textarea} autoCorrect="off" spellCheck={false} disabled />
    </section>
  );
};
