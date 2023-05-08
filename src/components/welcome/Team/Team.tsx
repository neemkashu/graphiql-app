import { Member } from '../Member';
import { TEAM } from '@/common';
import { TeamMember } from './Team.interface';
import styles from './Team.module.scss';

export const Team = (): JSX.Element => (
  <section className={styles.team}>
    <h3 className={styles.title}>Our team</h3>
    <div className={styles.members}>
      {TEAM.map((member: TeamMember) => (
        <Member key={member.id} {...member} />
      ))}
    </div>
  </section>
);
