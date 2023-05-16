'use client';
import { setVars, useAppDispatch, varsSelector } from '@/redux';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { customTheme } from '../customTheme';
import styles from './VarsSection.module.scss';

export const VarsSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(varsSelector);
  const dispatch = useAppDispatch();
  const onChangeHandler = (e: string): void => {
    dispatch(setVars(e));
  };

  return (
    <section className={styles.section}>
      <CodeMirror
        value={state}
        theme={customTheme({
          settings: { gutterBackground: '#21222d' },
        })}
        className={styles.codemirror}
        placeholder={t('variablesPlaceholder')}
        onChange={(e): void => {
          onChangeHandler(e);
        }}
        extensions={[json()]}
      />
    </section>
  );
};
