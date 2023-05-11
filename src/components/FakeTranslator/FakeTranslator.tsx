'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FakeTranslator.module.scss';

export const FakeTranslator = (): JSX.Element => {
  const [language, setLang] = useState('en');
  const changeLang = (): void => {
    setLang(language === 'en' ? 'ru' : 'en');
  }; // change to i18next

  return (
    <Link href={`/?lang=${language}`} as={`/${language}`}>
      <button onClick={changeLang} className={styles.button}>
        {language}
      </button>
    </Link>
  );
};
