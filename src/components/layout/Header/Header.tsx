'use client';
import { PageList } from '@/common';
import { usePathWithLocale } from '@/common/hook';
import { FakeTranslator } from '@/components/LangSwitcher/LangSwitcher';
import { useScrollState } from '@/components/layout/Header/Header.hook';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import { Nav } from './Nav/Nav';

export const Header = (): JSX.Element => {
  const isScroll = useScrollState();
  const [welcomePage] = usePathWithLocale([PageList.welcome]);

  return (
    <header className={classNames(styles.header, isScroll && styles.filling)}>
      <Link href={welcomePage} className={styles.logo}>
        <HeaderLogo />
      </Link>
      <Nav />
      <FakeTranslator />
    </header>
  );
};
