'use client';
import styles from './ResponseSection.module.scss';
import { useTranslations } from 'next-intl';

export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      <textarea className={styles.textarea} autoCorrect="off" spellCheck={false} disabled />
    </section>
  );
};
