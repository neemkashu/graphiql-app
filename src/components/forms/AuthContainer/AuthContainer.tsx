import { LoginForm, RegisterForm } from '@/components/forms';
import styles from './AuthContainer.module.scss';
import Link from 'next/link';
import { PageList } from '@/common';

export const AuthContainer = ({ hasAccount }: { hasAccount: boolean }): JSX.Element => {
  return hasAccount ? (
    <div className={styles.container}>
      <h2>{'Sign in'}</h2>
      {<LoginForm />}
      <p>
        <span>{"Don't have an account?"}</span>{' '}
        <Link href={PageList.signUp} className={styles.logo}>
          {'Sign up'}
        </Link>
      </p>
    </div>
  ) : (
    <div className={styles.container}>
      <h2>{'Register'}</h2>
      {<RegisterForm />}
      <p>
        <span>{'Already have an account?'}</span>{' '}
        <Link href={PageList.signIn} className={styles.logo}>
          {'Sign in'}
        </Link>
      </p>
    </div>
  );
};
