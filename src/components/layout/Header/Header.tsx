import { PageList } from '@/common';
import { LangButton } from '@/components/buttons';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import { Nav } from './Nav/Nav';

export const Header = (): JSX.Element => (
  <header className={styles.header}>
    <Link href={PageList.welcome} className={styles.logo}>
      <HeaderLogo />
    </Link>
    <Nav />
    <LangButton />
  </header>
);
