import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { getIsLogged, getLocale } from '@/firebase/firebaseAdmin';
import { redirect } from 'next/navigation';

export default async function SignIn(): Promise<JSX.Element> {
  let isLoggedIn = false;
  let locale = 'en';
  try {
    isLoggedIn = await getIsLogged(cookies());
    locale = getLocale(cookies());
  } catch (error) {}
  if (isLoggedIn) redirect(`/${locale}/playground`);

  return (
    <div className={styles.page}>
      <div className={styles.blur} />
      <AuthContainer hasAccount={true} />
    </div>
  );
}
