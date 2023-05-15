'use client';
import { responseSelector } from '@/redux';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import styles from './ResponseSection.module.scss';

export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(responseSelector);

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      <textarea
        className={styles.textarea}
        autoCorrect="off"
        spellCheck={false}
        disabled
        value={state}
      />
    </section>
  );
};
