import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { adminSDK } from '@/firebase/firebaseAdmin';
import nookies from 'nookies';

export default async function SignIn(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  // const cookiesNokie = nookies.get(ctx);
  console.log('token', token);
  let isLoggedIn = false;

  try {
    const adminToken = await adminSDK.auth().verifyIdToken(token);
    console.log('adminToken', adminToken);

    // the user is authenticated!
    // const { uid } = token;
    // const user = await adminSDK.auth().getUser(uid);
    isLoggedIn = true;
  } catch (error) {
    console.error('Admin cannot parse: ', error?.message);

    isLoggedIn = false;
  }

  return (
    <div className={styles.page}>
      {`login state: ${isLoggedIn}`}
      <div className={styles.blur} />
      <AuthContainer hasAccount />
    </div>
  );
}
