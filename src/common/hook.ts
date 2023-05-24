/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import { USER_TOKEN_KEY } from '@/common';
import {
  ALL_LANGUAGES,
  BASIC_LANGUAGE,
  DEBOUNCE_TIME,
  LS_KEYS,
  USER_COLLECTON_PATH,
} from '@/common/const';
import { PageList } from '@/common/enum';
import { database, firebaseAuth, logout } from '@/firebase';
import {
  UserPlaygroundData,
  playgroundDataSelector,
  useAppDispatch,
  useAppSelector,
} from '@/redux';
import {
  resetSlice,
  setError,
  setIsFetch,
  setResponse,
  setSlice,
} from '@/redux/playground/playground.slice';
import { useLazyGetDataQuery } from '@/redux/rickAndMorty/rickAndMorty.api';
import { store } from '@/redux/store';
import { onIdTokenChanged, Unsubscribe } from 'firebase/auth';
import { DocumentData, DocumentReference, doc, getDoc, setDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import nookies from 'nookies';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

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

export const useDebounce = <T>(data: T) => {
  const [debouncedData, setDebouncedData] = useState(data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedData(data);
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);
  return [debouncedData];
};

export const useSetStoreWithFirebase = () => {
  const [user, isUserLoading] = useAuthState(firebaseAuth);
  const dispatch = useAppDispatch();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const updatedData = useAppSelector(playgroundDataSelector);
  const [data] = useDebounce<UserPlaygroundData>(updatedData);
  const previousData = useRef<UserPlaygroundData | null>(null);
  const documentRef = useRef<DocumentReference<DocumentData> | null>(null);

  useEffect(() => {
    if (isUserLoading || !user) return;
    const { init } = store.getState().playgroundSlice;
    if (!init) return;

    if (process.env.NODE_ENV === 'development') console.log('setStore!');
    const { uid } = user;
    documentRef.current = doc(database, USER_COLLECTON_PATH, uid);

    setIsDataLoading(true);
    getDoc(documentRef.current)
      .then((documentSnapshot) => {
        const savedData = documentSnapshot.data()?.playground;
        const userData = savedData
          ? JSON.parse(savedData)
          : { operation: '', headers: '', vars: '' };

        dispatch(setSlice(userData));
        previousData.current = {
          headers: userData.headers,
          vars: userData.vars,
          operation: userData.operation,
        };
      })
      .catch((error) => setError(error))
      .finally(() => setIsDataLoading(false));
  }, [dispatch, isUserLoading, user]);

  useEffect(() => {
    if (!isUserLoading && !user) dispatch(resetSlice());
  }, [dispatch, isUserLoading, user]);

  // useEffect(() => {
  //   if (isUserLoading) return;
  //   const isChangedData = JSON.stringify(previousData.current) !== JSON.stringify(data);
  //   if (isChangedData) {
  //     if (process.env.NODE_ENV === 'development') console.log('save this!', data);
  //     previousData.current = data;
  //   }

  //   return (): void => {
  //     if (isUserLoading) return;
  //     if (isChangedData) {
  //       if (process.env.NODE_ENV === 'development') console.log('save immidiately!', data);
  //     }
  //   };
  // }, [data, isUserLoading]);

  // useEffect(() => {
  //   if (isUserLoading) return;
  //   if (!user) {
  //     dispatch(resetSlice());
  //     return;
  //   }

  //   const { uid } = user;
  //   documentRef.current = doc(database, USER_COLLECTON_PATH, uid);

  //   const saveStore = async () => {
  //     setIsDataLoading(true);
  //     await setDoc(
  //       documentRef.current,
  //       {
  //         playground: JSON.stringify(store.getState().playgroundSlice),
  //       },
  //       { merge: true }
  //     )
  //       .catch((error) => setError(error))
  //       .finally(() => setIsDataLoading(false));
  //   };

  //   return () => {
  //     console.log('user effect', user);
  //   };
  // }, [dispatch, user, isUserLoading]);

  return [isDataLoading, error];
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

      const logoutDuration = new Date(expirationTime).getTime() - Date.now();

      const timer = setTimeout(() => {
        logout();
      }, logoutDuration);

      timerRef.current = timer;
    });
    return () => {
      clearTimeout(timerRef.current);
      unsubscribe();
    };
  }, []);
};

export const useRequest = () => {
  const dispatch = useAppDispatch();
  const [fetchData, { currentData, error, isFetching }] = useLazyGetDataQuery();

  useEffect((): void => {
    dispatch(setIsFetch(isFetching));
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
      return (): void => {
        dispatch(setError(null));
      };
    }
  }, [dispatch, error]);

  useEffect((): void => {
    if (currentData) dispatch(setResponse(JSON.stringify(currentData, null, 2)));
  }, [currentData, dispatch]);
  return fetchData;
};
