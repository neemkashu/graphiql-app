'use client';
import styles from './VarsSection.module.scss';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { setVars, varsSelector } from '@/redux';

export const VarsSection = (): JSX.Element => {
  const t = useTranslations('Playground');

  const state = useSelector(varsSelector);
  const dispatch = useDispatch();
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
