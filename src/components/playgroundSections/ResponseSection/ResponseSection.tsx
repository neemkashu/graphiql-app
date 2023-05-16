'use client';
import { Spinner } from '@/components/loading';
import { responseSelector } from '@/redux';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { customTheme } from '../customTheme';
import styles from './ResponseSection.module.scss';

export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');
  const state = useSelector(responseSelector);

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      {state === 'isFetching' ? (
        <div className={styles.loaderWrapper}>
          <Spinner isSmall={isMobile} />
        </div>
      ) : (
        <CodeMirror
          value={state}
          theme={customTheme}
          className={styles.codemirror}
          readOnly
          extensions={[json()]}
        />
      )}
    </section>
  );
};
