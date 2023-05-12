'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import styles from './FakeTranslator.module.scss';

export const FakeTranslator = (): JSX.Element => {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === 'en' ? 'ru' : 'en';

  return (
    <Link className={styles.button} href={'/' + otherLocale + pathname}>
      {otherLocale}
    </Link>
  );
};
