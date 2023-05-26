'use client';

import { useLoadFirestore, useTokenExpire } from '@/common/hook';
import { DebouncedSaver } from '@/components/layout/FireStore/DebouncedSaver';
import { previousDataSelector, useAppSelector } from '@/redux';

export default function FireStore({ children }: { children: JSX.Element[] }): JSX.Element {
  useTokenExpire();
  const previousData = useAppSelector(previousDataSelector);
  const { isDataLoading, documentRef } = useLoadFirestore();

  const isDataLoaded = !!previousData && !isDataLoading;

  return (
    <>
      {isDataLoaded ? <DebouncedSaver documentRef={documentRef} /> : null}
      {children}
    </>
  );
}
