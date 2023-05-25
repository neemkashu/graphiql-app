import { LOGO_ALT, LOGO_PATH } from '@/components/layout/Header/HeaderLogo/HeaderLogo.const';
import styles from './HeaderLogo.module.scss';
import Image from 'next/image';

export const HeaderLogo = (): JSX.Element => (
  <>
    <span className={styles.mainText}>GraphiQL |</span>
    <span className={styles.secondText}> by No Panic</span>
    <Image src={LOGO_PATH} alt={LOGO_ALT} width={30} height={30} className={styles.logo} />
  </>
);
