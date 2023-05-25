'use client';

import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';

export default function SignInClient(): JSX.Element {
  return (
    <div className={styles.page}>
      <AuthContainer hasAccount={true} />
    </div>
  );
}
