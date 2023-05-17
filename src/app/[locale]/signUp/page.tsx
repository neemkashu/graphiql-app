import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getIsLogged, getLocale } from '@/firebase/firebaseAdmin';

export default async function SignUp(): Promise<JSX.Element> {
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
      <AuthContainer hasAccount={false} />
    </div>
  );
}
