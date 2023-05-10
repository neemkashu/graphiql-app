/* eslint-disable no-console */
'use client';
import { PageList } from '@/common';
import { FakeTranslator } from '@/components/FakeTranslator/FakeTranslator';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import { Nav } from './Nav/Nav';

const isPageTop = (): boolean => window.pageYOffset > 20;

export const Header = (): JSX.Element => {
  const [state, setState] = useState(isPageTop());
  const setHeaderFilling = (): void => {
    setState(isPageTop());
  };

  useEffect((): (() => void) => {
    window.addEventListener('scroll', setHeaderFilling);
    return (): void => {
      window.removeEventListener('scroll', setHeaderFilling);
    };
  }, []);

  return (
    <header className={classNames(styles.header, state && styles.filling)}>
      <Link href={PageList.welcome} className={styles.logo}>
        <HeaderLogo />
      </Link>
      <Nav />
      <FakeTranslator />
    </header>
  );
};
