'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import styles from './LangSwitcher.module.scss';
import { useRouter } from 'next/navigation';
import { ALL_LANGUAGES } from '@/common';
import { LangNames } from '@/components/LangSwitcher/LangSwitcher.enum';

export const FakeTranslator = (): JSX.Element => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [firstLang, secondLang] = ALL_LANGUAGES;
  const otherLocale = locale === firstLang ? secondLang : firstLang;

  const changeLang = (): void => {
    router.push(`/${otherLocale}${pathname}`);
  };

  return (
    <button className={styles.button} onClick={changeLang}>
      {otherLocale === firstLang ? LangNames.en : LangNames.ru}
    </button>
  );
};
