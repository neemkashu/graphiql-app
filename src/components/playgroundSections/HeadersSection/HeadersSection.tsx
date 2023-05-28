'use client';
import { headersSelector, useAppDispatch } from '@/redux';
import { setHeaders } from '@/redux/playground/playground.slice';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { customTheme } from '../customTheme';
import styles from './HeadersSection.module.scss';

export const HeadersSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(headersSelector);
  const dispatch = useAppDispatch();
  const onChangeHandler = (value: string): void => {
    dispatch(setHeaders(value));
  };

  return (
    <section className={styles.section}>
      <CodeMirror
        spellCheck={true}
        value={state}
        theme={customTheme({
          settings: { gutterBackground: '#21222d' },
        })}
        placeholder={t('headersPlaceholder')}
        onChange={(value): void => {
          onChangeHandler(value);
        }}
        extensions={[json()]}
      />
    </section>
  );
};
