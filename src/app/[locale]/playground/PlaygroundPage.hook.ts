'use client';

import { MOBILE_BREAKPOINT } from '@/common/const';
import { useEffect, useState } from 'react';

export const useWidthState = (): boolean => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect((): (() => void) => {
    const isWidthMobile = (): boolean => window.innerWidth <= MOBILE_BREAKPOINT;
    const setMobileView = (): void => {
      setIsMobileView(isWidthMobile());
    };

    setMobileView();
    window.addEventListener('resize', setMobileView);
    return (): void => {
      window.removeEventListener('resize', setMobileView);
    };
  }, []);
  return isMobileView;
};
