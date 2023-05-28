import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getIsLogged, getLocale } from '@/firebase/firebaseAdmin';
import { PageList } from '@/common';

export default async function SignUp(): Promise<JSX.Element> {
  let isLoggedIn = false;
  let locale = 'en';
  try {
    isLoggedIn = await getIsLogged(cookies());
    locale = getLocale(cookies());
  } catch {}
  if (isLoggedIn) redirect(`/${locale}${PageList.playground}`);

  return (
    <div className={styles.page}>
      <AuthContainer hasAccount={false} />
    </div>
  );
}
