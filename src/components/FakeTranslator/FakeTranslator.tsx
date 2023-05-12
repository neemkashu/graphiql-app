'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import styles from './FakeTranslator.module.scss';

export const FakeTranslator = (): JSX.Element => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // const language = locale === 'en' ? 'ru' : 'en';

  const changeLang = (): void => {
    router.replace(`/${locale === 'en' ? 'ru' : 'en'}${pathname}`);
  }; // change to i18next

  return (
    <button onClick={changeLang} className={styles.button}>
      {locale === 'en' ? 'ru' : 'en'}
    </button>
  );
};
