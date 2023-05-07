'use client';

import { ButtonStyle, PageList } from '@/common';
import { MainButton } from '@/components';
import Link from 'next/link';

const logOut = (): void => {
  // eslint-disable-next-line no-console
  console.log('log out'); // make log out fn
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
