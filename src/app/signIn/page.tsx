// 'use client';

// import { setAuthState } from '@/redux/slices/authSlice';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import styles from './page.module.scss';

export default function SignIn(): JSX.Element {
  // const authState = useAppSelector((state) => state.authSlice.authState);
  // const dispatch = useAppDispatch();
  // console.log(authState);

  return (
    <section className={styles.page}>
      <h1
      // onClick={() => (authState ? dispatch(setAuthState(false)) : dispatch(setAuthState(true)))}
      >
        Sign in page
      </h1>
    </section>
  );
}
