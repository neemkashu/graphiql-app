'use client';
import {
  DEFAULT_PLAYGROUND_SIZE,
  LS_PLAYGROUND_SIZE_KEY,
  PlaygroundSize,
  savePlaygroundSize,
} from '@/components';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const usePLayGroundSize = (): [PlaygroundSize, Dispatch<SetStateAction<PlaygroundSize>>] => {
  const [sizes, setSizes] = useState<PlaygroundSize>(DEFAULT_PLAYGROUND_SIZE);
  const currentSizeRef = useRef(sizes);

  useEffect((): void => {
    currentSizeRef.current = sizes;
  }, [sizes]);

  useEffect((): (() => void) => {
    const lsState = localStorage.getItem(LS_PLAYGROUND_SIZE_KEY);
    const savePageSizes = (): void => savePlaygroundSize.call(null, currentSizeRef.current);

    if (lsState) setSizes(JSON.parse(lsState));
    window.addEventListener('beforeunload', savePageSizes);
    return (): void => {
      savePageSizes();
      window.removeEventListener('beforeunload', savePageSizes);
    };
  }, []);

  return [sizes, setSizes];
};
