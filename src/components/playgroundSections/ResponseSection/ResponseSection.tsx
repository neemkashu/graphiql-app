'use client';
import styles from './ResponseSection.module.scss';
import { useTranslations } from 'next-intl';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { customTheme } from '../customTheme';
export const ResponseSection = ({
  isMobile,
  value,
}: {
  isMobile?: boolean;
  value: string;
}): JSX.Element => {
  const t = useTranslations('Playground');

  return (
    <section className={styles.section}>
      {isMobile && <button className={styles.button}>{t('response')}</button>}
      <CodeMirror
        value={value}
        theme={customTheme}
        className={styles.codemirror}
        height="100%"
        readOnly
        extensions={[json()]}
      />
    </section>
  );
};
