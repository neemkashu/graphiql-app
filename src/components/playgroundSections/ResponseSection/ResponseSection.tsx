'use client';
import { responseSelector } from '@/redux';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import styles from './ResponseSection.module.scss';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { customTheme } from '../customTheme';
export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(responseSelector);

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      <CodeMirror
        value={state}
        theme={customTheme}
        className={styles.codemirror}
        readOnly
        extensions={[json()]}
      />
    </section>
  );
};
