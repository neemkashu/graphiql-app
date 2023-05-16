'use client';
import { setVars, useAppDispatch, varsSelector } from '@/redux';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styles from './VarsSection.module.scss';

export const VarsSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(varsSelector);
  const dispatch = useAppDispatch();
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setVars(e.target.value));
  };

  return (
    <section className={styles.section}>
      <textarea
        className={styles.textarea}
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('variablesPlaceholder')}
        value={state}
        onChange={(e): void => {
          onChangeHandler(e);
        }}
      />
    </section>
  );
};
