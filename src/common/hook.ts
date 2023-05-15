/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import { ALL_LANGUAGES, BASIC_LANGUAGE } from '@/common/const';
import { PageList } from '@/common/enum';
import { setResponse } from '@/redux';
import { useLazyGetDataQuery } from '@/redux/rickAndMorty/rickAndMorty.api';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

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

export const usePathWithLocale = (pagePath: PageList[]): string[] => {
  const pathName = usePathname();
  const locale = pathName ? pathName.slice(1, 3) : BASIC_LANGUAGE;
  const outputLocale = ALL_LANGUAGES.includes(locale) ? locale : BASIC_LANGUAGE;
  return pagePath.map((page): string => `/${outputLocale}${page}`);
};

export const useRequest = () => {
  const dispatch = useDispatch();
  const [fetchData, { currentData, error }] = useLazyGetDataQuery();

  useEffect((): void => {
    console.log(currentData, error);
    if (currentData || error) {
      dispatch(setResponse(JSON.stringify(currentData || error, null, 2)));
    }
  }, [currentData, dispatch, error]);
  return fetchData;
};
