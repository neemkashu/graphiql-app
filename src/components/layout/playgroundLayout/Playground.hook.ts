'use client';

import { useEffect, useState, useRef, LegacyRef } from 'react';

export const useSceletonState = (
  isDocsOpen: boolean,
  breakpoint: number
): [LegacyRef<HTMLDivElement>, number] => {
  const [lineCount, setLineCount] = useState(1);

  const docsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = docsRef?.current?.getBoundingClientRect().width;

    if (width && isDocsOpen) {
      setLineCount(width < breakpoint ? 2 : 1);
    }
  }, [isDocsOpen, breakpoint]);

  return [docsRef, lineCount];
};
