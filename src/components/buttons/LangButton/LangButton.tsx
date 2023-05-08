'use client';

import { useState } from 'react';
import styles from './LangButton.module.scss';

export const LangButton = (): JSX.Element => {
  const [language, changeLang] = useState('en');
  const onClickHandler = (): void => {
    changeLang(language === 'en' ? 'ru' : 'en');
  }; // change to i18next

  return (
    <button className={styles.button} onClick={(): void => onClickHandler()}>
      {language}
    </button>
  );
};
