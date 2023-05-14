import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { checkAuthenticated } from '@/firebase/firebaseAdmin';
import { redirect } from 'next/navigation';

export const revalidate = 10; // revalidate every hour

export default async function SignIn(): Promise<JSX.Element> {
  const cookieStore = cookies();
  let isLoggedIn = false;

  console.log('SIGN IN PAGE CODE');

  try {
    isLoggedIn = await checkAuthenticated(cookieStore);

    console.log('TRY isLoggedIn', isLoggedIn);
  } catch (error) {
    console.log('CATCH isLoggedIn', isLoggedIn);
    // eslint-disable-next-line no-console
    if (error instanceof Error) console.log('Admin cannot parse: ', error?.message);
    isLoggedIn = false;
  } finally {
    if (isLoggedIn) redirect('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.blur} />
      <AuthContainer hasAccount />
    </div>
  );
}
