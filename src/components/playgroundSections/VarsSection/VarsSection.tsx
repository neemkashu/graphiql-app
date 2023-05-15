'use client';
import styles from './VarsSection.module.scss';
import { useTranslations } from 'next-intl';

export const VarsSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoFocus
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('variablesPlaceholder')}
      />
    </section>
  );
};
