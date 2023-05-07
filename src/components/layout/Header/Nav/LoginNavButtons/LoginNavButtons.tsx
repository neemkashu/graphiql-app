import { ButtonStyle, PageList } from '@/common';
import { MainButton } from '@/components';
import Link from 'next/link';

export const LoginNavButtons = (): JSX.Element => (
  <>
    <Link href={PageList.signIn}>
      <MainButton style={ButtonStyle.normal} disabled={false}>
        Sign in
      </MainButton>
    </Link>
    <Link href={PageList.signUp}>
      <MainButton style={ButtonStyle.active} disabled={false}>
        Sign up
      </MainButton>
    </Link>
  </>
);
