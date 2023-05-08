'use client';

import { RoundButton } from '@/components';
import { useState } from 'react';

export const FakeTranslator = (): JSX.Element => {
  const [language, setLang] = useState('en');
  const changeLang = (): void => {
    setLang(language === 'en' ? 'ru' : 'en');
  }; // change to i18next

  return <RoundButton action={changeLang}>{language}</RoundButton>;
};
