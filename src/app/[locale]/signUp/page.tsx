import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { checkAuthenticated } from '@/firebase/firebaseAdmin';

export default async function SignUp(): Promise<JSX.Element> {
  let isLoggedIn = false;
  try {
    const cookieStore = cookies();
    isLoggedIn = await checkAuthenticated(cookieStore);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (error instanceof Error) console.log('Admin cannot parse: ', error?.message);
    isLoggedIn = false;
  }

  return (
    <div className={styles.page}>
      <div className={styles.blur} />
      <AuthContainer hasAccount={false} isLoggedIn={isLoggedIn} />
    </div>
  );
}
