/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import { USER_TOKEN_KEY } from '@/common';
import { ALL_LANGUAGES, BASIC_LANGUAGE, LS_KEYS } from '@/common/const';
import { PageList } from '@/common/enum';
import { firebaseAuth, logout } from '@/firebase';
import { useAppDispatch } from '@/redux';
import { setError, setIsFetch, setResponse, setSlice } from '@/redux/playground/playground.slice';
import { useLazyGetDataQuery } from '@/redux/rickAndMorty/rickAndMorty.api';
import { store } from '@/redux/store';
import { onIdTokenChanged, Unsubscribe } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import nookies from 'nookies';
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

export const useSetStore = () => {
  const dispatch = useAppDispatch();
  useEffect((): (() => void) => {
    const setStore = () => {
      const { init } = store.getState().playgroundSlice;
      if (!init) return;
      const lsStore = localStorage.getItem(LS_KEYS.REDUX);
      if (lsStore) dispatch(setSlice(JSON.parse(lsStore)));
    };

    const saveStore = () => {
      localStorage.setItem(LS_KEYS.REDUX, JSON.stringify(store.getState().playgroundSlice));
    };

    setStore();
    window.addEventListener('beforeunload', saveStore);
    return (): void => {
      window.removeEventListener('beforeunload', saveStore);
    };
  }, [dispatch]);
};

export const usePathWithLocale = (pagePath: PageList[]): string[] => {
  const pathName = usePathname();
  const locale = pathName ? pathName.slice(1, 3) : BASIC_LANGUAGE;
  const outputLocale = ALL_LANGUAGES.includes(locale) ? locale : BASIC_LANGUAGE;
  return pagePath.map((page): string => `/${outputLocale}${page}`);
};

export const useTokenExpire = (): void => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect((): Unsubscribe => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (firebaseUser): Promise<void> => {
      if (!firebaseUser) return;

      const token = await firebaseUser.getIdToken();
      nookies.set(undefined, USER_TOKEN_KEY, token, { path: '/' });

      const { expirationTime } = await firebaseUser.getIdTokenResult();
      // eslint-disable-next-line no-console
      console.log('expirationTime', new Date(expirationTime).getTime());

      const logoutDuration = new Date(expirationTime).getTime() - Date.now();
      // eslint-disable-next-line no-console
      console.log('logoutDuration', logoutDuration);

      const timer = setTimeout(() => {
        logout();
      }, logoutDuration);

      timerRef.current = timer;
    });
    return () => {
      // eslint-disable-next-line no-console
      console.log('CLEAR TIMER: ', timerRef.current);
      clearTimeout(timerRef.current);
      unsubscribe();
    };
  }, []);
};

export const useRequest = () => {
  const dispatch = useAppDispatch();
  const [fetchData, { currentData, error, isFetching, isError }] = useLazyGetDataQuery();

  useEffect((): void => {
    dispatch(setIsFetch(isFetching));
  }, [dispatch, isFetching]);

  useEffect(() => {
    dispatch(setError(error || null));
  }, [dispatch, error, isError]);

  useEffect((): void => {
    if (currentData) dispatch(setResponse(JSON.stringify(currentData, null, 2)));
  }, [currentData, dispatch]);
  return fetchData;
};
