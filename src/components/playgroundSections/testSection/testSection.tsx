import styles from './testSection.module.scss';

export const TestSection = ({ children }: { children: string }): JSX.Element => (
  <section className={styles.section}>{children}</section>
);
