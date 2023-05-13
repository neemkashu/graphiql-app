'use client';

import { useTranslations } from 'next-intl';
import { Member } from '../Member';
import { TEAM } from '@/common';
import { TeamMember } from '@/common';
import styles from './Team.module.scss';

export const Team = (): JSX.Element => {
  const t = useTranslations('Team');
  const members = (): JSX.Element[] =>
    TEAM.map((member: TeamMember): JSX.Element => <Member key={member.id} {...member} />);

  return (
    <section className={styles.team}>
      <h3 className={styles.title}>{t('title')}</h3>
      <div className={styles.members}>{members()}</div>
    </section>
  );
};
