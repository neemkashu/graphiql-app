'use client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useFieldSize = <T>(
  defaultSize: T,
  lsKey: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [sizes, setSizes] = useState<T>(defaultSize);
  const currentSizeRef = useRef(sizes);

  useEffect((): void => {
    currentSizeRef.current = sizes;
  }, [sizes]);

  useEffect((): (() => void) => {
    const lsState = localStorage.getItem(lsKey);

    const saveFieldSize = (size: T, lsKey: string): void => {
      localStorage.setItem(lsKey, JSON.stringify(size));
    };
    const savePageSizes = (): void => saveFieldSize.call(null, currentSizeRef.current, lsKey);

    if (lsState) setSizes(JSON.parse(lsState));
    window.addEventListener('beforeunload', savePageSizes);
    return (): void => {
      savePageSizes();
      window.removeEventListener('beforeunload', savePageSizes);
    };
  }, [lsKey]);

  return [sizes, setSizes];
};
