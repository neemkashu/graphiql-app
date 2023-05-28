'use client';

import { RS_ALT, RS_LINK, RS_PATH } from './FooterConst';
import { TEAM } from '@/common';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => {
  const t = useTranslations('Team');

  const fillLinks = (): JSX.Element[] =>
    TEAM.map(
      (member): JSX.Element => (
        <a href={t(member + '.github')} key={member}>
          {t(member + '.name')}
        </a>
      )
    );

  return (
    <footer className={styles.footer}>
      {fillLinks()}
      <span className={styles.year}>&copy; 2023</span>
      <a className={styles.icon} href={RS_LINK}>
        <Image src={RS_PATH} alt={RS_ALT} width={30} height={25} />
      </a>
    </footer>
  );
};
