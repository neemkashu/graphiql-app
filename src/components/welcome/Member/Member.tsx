import Image from 'next/image';
import Link from 'next/link';
import { TeamMember } from '@/common';
import styles from './Member.module.scss';

export const Member = ({
  img,
  name,
  role,
  description,
  github,
  color,
}: TeamMember): JSX.Element => (
  <div className={styles.member}>
    <div className={styles.blur} style={{ backgroundColor: `${color}` }}></div>
    <Image src={img} alt="developer" width={100} height={100} className={`${styles.img}`} />
    <Link href={github} className={styles.name}>
      {name}
    </Link>
    <div className={styles.role}>{role}</div>
    <div className={styles.descr}>{description}</div>
  </div>
);
