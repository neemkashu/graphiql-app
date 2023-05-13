import styles from './OperationSection.module.scss';

export const OperationSection = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoFocus
        autoCorrect="off"
        spellCheck={false}
        placeholder="enter code"
      />
    </section>
  );
};
