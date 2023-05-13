'use client';

import { useTranslations } from 'next-intl';
import { Member } from '../Member';
import styles from './Team.module.scss';

export const Team = (): JSX.Element => {
  const t = useTranslations('Team');
  const members = (): JSX.Element[] =>
    ['Aliaksei', 'Yuliya', 'Ekaterina'].map(
      (member): JSX.Element => <Member key={member} member={member} />
    );

  return (
    <section className={styles.team}>
      <h3 className={styles.title}>{t('title')}</h3>
      <div className={styles.members}>{members()}</div>
    </section>
  );
};
