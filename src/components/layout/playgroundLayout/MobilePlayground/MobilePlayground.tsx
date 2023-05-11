'use client';
import { MobilePlaygroundProps } from '@/components';
import styles from './MobilePlayground.module.scss';

export const MobilePlayground = ({
  children: { documentation, resizeMobileBlock },
}: MobilePlaygroundProps): JSX.Element => {
  // const [page, setPage] = useState()
  return <section className={styles.container} />;
};
