'use client';
import { operationSelector, setOperation, useAppDispatch } from '@/redux';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
// import { graphql } from 'cm6-graphql';
import { customTheme } from '../customTheme';
// import { schema } from './OperationSection.mock';
import styles from './OperationSection.module.scss';

export const OperationSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(operationSelector);

  const dispatch = useAppDispatch();
  const onChangeHandler = (value: string): void => {
    dispatch(setOperation(value));
  };

  return (
    <section className={styles.section}>
      <CodeMirror
        autoFocus
        value={state}
        theme={customTheme({
          settings: { gutterBackground: '#21222d' },
        })}
        className={styles.codemirror}
        placeholder={t('operationPlaceholder')}
        // extensions={graphql(schema)}
        extensions={[json()]}
        onChange={(value): void => {
          onChangeHandler(value);
        }}
      />
    </section>
  );
};
