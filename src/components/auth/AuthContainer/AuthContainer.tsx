import styles from './AuthContainer.module.scss';
import Link from 'next/link';
import { PageList } from '@/common';
import { LoginForm } from '@/components/auth/Login/LoginForm';
import { RegisterForm } from '@/components/auth/Register/RegisterForm';

export const AuthContainer = ({ hasAccount }: { hasAccount: boolean }): JSX.Element => {
  return hasAccount ? (
    <div className={styles.container}>
      <h2>{'Sign in'}</h2>
      {<LoginForm />}
      <p className={styles.question}>
        <span>{"Don't have an account?"}</span>
        <Link href={PageList.signUp} className={styles.link}>
          {'Sign up'}
        </Link>
      </p>
    </div>
  ) : (
    <div className={styles.container}>
      <h2>{'Register'}</h2>
      {<RegisterForm />}
      <p className={styles.question}>
        <span>{'Already have an account?'}</span>
        <Link href={PageList.signIn} className={styles.link}>
          {'Sign in'}
        </Link>
      </p>
    </div>
  );
};
