'use client';
import { isPageTop } from '@/components';
import { useEffect, useState } from 'react';

export const useScrollState = (): boolean => {
  const [isScroll, setIsScroll] = useState(isPageTop());
  const setHeaderFilling = (): void => {
    setIsScroll(isPageTop());
  };

  useEffect((): (() => void) => {
    window.addEventListener('scroll', setHeaderFilling);
    return (): void => {
      window.removeEventListener('scroll', setHeaderFilling);
    };
  }, []);
  return isScroll;
};
