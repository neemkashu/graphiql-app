'use client';
import { Spinner } from '@/components/loading';
import { isFetchSelector, responseSelector } from '@/redux';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useSelector } from 'react-redux';
import { customTheme } from '../customTheme';
import styles from './ResponseSection.module.scss';

export const ResponseSection = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const state = useSelector(responseSelector);
  const isFetching = useSelector(isFetchSelector);

  return (
    <section className={styles.section}>
      {isFetching ? (
        <div className={styles.loaderWrapper}>
          <Spinner isSmall={isMobile} />
        </div>
      ) : (
        <CodeMirror value={state} theme={customTheme()} readOnly extensions={[json()]} />
      )}
    </section>
  );
};
