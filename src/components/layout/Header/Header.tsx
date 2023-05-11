'use client';
import { PageList } from '@/common';
import { FakeTranslator } from '@/components/FakeTranslator/FakeTranslator';
import { useScrollState } from '@/components/layout/Header/Header.hook';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import { Nav } from './Nav/Nav';

export const Header = (): JSX.Element => {
  const isScroll = useScrollState();

  return (
    <header className={classNames(styles.header, isScroll && styles.filling)}>
      <Link href={PageList.welcome} className={styles.logo}>
        <HeaderLogo />
      </Link>
      <Nav />
      <FakeTranslator />
    </header>
  );
};
