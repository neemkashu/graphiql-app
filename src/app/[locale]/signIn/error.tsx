'use client';

import { PageList } from '@/common';
import { usePathWithLocale } from '@/common/hook';
import { AuthContainer } from '@/components/auth/AuthContainer/AuthContainer';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './page.module.scss';

export default function Error({ error, reset }: { error: Error; reset: () => void }): JSX.Element {
  const router = useRouter();
  const [user] = useAuthState(firebaseAuth);
  const [playgroundPage] = usePathWithLocale([PageList.playground]);

  // eslint-disable-next-line no-console
  console.log('ERROR PAGE SIGN IN', error.message);

  // router.refresh();
  if (user) {
    router.push(playgroundPage);
  } else {
    // reset();
  }
  return (
    <>
      <p>Error occured</p>
      <div className={styles.page}>
        <div className={styles.blur} />
        <AuthContainer hasAccount isLoggedIn={false} />
      </div>
    </>
  );
}
