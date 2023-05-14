'use client';
import { useTranslations } from 'next-intl';
import styles from './OperationSection.module.scss';

export const OperationSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoFocus
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('operationPlaceholder')}
      />
    </section>
  );
};
