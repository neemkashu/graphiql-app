'use client';

import { useState } from 'react';
import styles from './FakeTranslator.module.scss';

export const FakeTranslator = (): JSX.Element => {
  const [language, setLang] = useState('en');
  const changeLang = (): void => {
    setLang(language === 'en' ? 'ru' : 'en');
  }; // change to i18next

  return (
    <button onClick={changeLang} className={styles.button}>
      {language}
    </button>
  );
};
