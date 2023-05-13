'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './Member.module.scss';

export const Member = ({ member }: { member: string }): JSX.Element => {
  const t = useTranslations('Team');

  return (
    <div className={styles.member}>
      <div className={styles.blur} style={{ backgroundColor: `${t(member + '.color')}` }} />
      <Image
        src={t(member + '.img')}
        alt="developer"
        width={100}
        height={100}
        className={`${styles.img}`}
      />
      <Link href={t(member + '.github')} target="blank" className={styles.name}>
        {t(member + '.name')}
      </Link>
      <div className={styles.role}>{t(member + '.role')}</div>
      <div className={styles.descr}>{t(member + '.description')}</div>
    </div>
  );
};
