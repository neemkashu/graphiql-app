'use client';
import { operationSelector, useAppDispatch } from '@/redux';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { customTheme } from '../customTheme';
import { schema } from './rickAndMortySchema';
import styles from './OperationSection.module.scss';
import { setOperation } from '@/redux/playground/playground.slice';

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
        spellCheck={true}
        autoFocus
        value={state}
        theme={customTheme({
          settings: { gutterBackground: '#21222d' },
        })}
        placeholder={t('operationPlaceholder')}
        extensions={[graphql(schema)]}
        onChange={(value): void => {
          onChangeHandler(value);
        }}
      />
    </section>
  );
};
