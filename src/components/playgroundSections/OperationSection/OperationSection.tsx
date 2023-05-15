'use client';
import { operationSelector, setOperation } from '@/redux';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OperationSection.module.scss';

export const OperationSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(operationSelector);
  const dispatch = useDispatch();
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setOperation(e.target.value));
  };

  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoFocus
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('operationPlaceholder')}
        value={state}
        onChange={(e): void => {
          onChangeHandler(e);
        }}
      />
    </section>
  );
};
