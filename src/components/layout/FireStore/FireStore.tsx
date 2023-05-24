'use client';

import { useSetStoreWithFirebase, useTokenExpire } from '@/common/hook';

export default function FireStore({ children }: { children: JSX.Element[] }): JSX.Element {
  useTokenExpire();
  useSetStoreWithFirebase();

  return <>{children}</>;
}
