import styles from './VarsSection.module.scss';

export const VarsSection = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoFocus
        autoCorrect="off"
        spellCheck={false}
        placeholder="variables ( JSON )"
      />
    </section>
  );
};
