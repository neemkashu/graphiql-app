'use client';

import { PageList } from '@/common';
import { ButtonStyle, MainButton } from '@/components';
import { logout } from '@/firebase';
import Link from 'next/link';

const logOut = (): void => {
  logout();
};

export const PlaygroundNavButtons = (): JSX.Element => (
  <>
    <Link href={PageList.welcome}>
      <MainButton style={ButtonStyle.normal} disabled={false} action={logOut}>
        Log out
      </MainButton>
    </Link>
    <Link href={PageList.playground}>
      <MainButton style={ButtonStyle.active} disabled={false}>
        To playground
      </MainButton>
    </Link>
  </>
);
