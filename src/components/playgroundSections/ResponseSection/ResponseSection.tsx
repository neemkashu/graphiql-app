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
  // const data = {
  //   data: {
  //     characters: {
  //       results: [
  //         {
  //           name: 'Rick Sanchez',
  //           status: 'Alive',
  //         },
  //         {
  //           name: 'Morty Smith',
  //           status: 'Alive',
  //         },
  //       ],
  //     },
  //   },
  // };
  // value={JSON.stringify(data, null, 2)

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      <CodeMirror
        value={state}
        theme={customTheme}
        className={styles.codemirror}
        height="100%"
        readOnly
        extensions={[json()]}
      />
    </section>
  );
};
