'use client';
import { getOperationNames, makeRequest, nameWithDots } from '@/common/helper';
import { useRequest } from '@/common/hook';
import {
  DESKTOP_WORD_LENGTH,
  JSON_ERROR,
  MOBILE_WORD_LENGTH,
} from '@/components/Runner/Runner.const';
import { RickAndMortyReq, useAppDispatch } from '@/redux';
import { setError } from '@/redux/playground/playground.slice';
import { store } from '@/redux/store';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './Runner.module.scss';

export const Runner = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');
  const sendRequest = useRequest();
  const dispatch = useAppDispatch();
  const [operationNames, setOperationNames] = useState<string[]>([]);
  const isMultipleRequest = operationNames.length > 1;

  const run = ([request, isJsonValid]: [RickAndMortyReq, boolean]): void => {
    isJsonValid ? sendRequest(request) : dispatch(setError(JSON_ERROR));
  };

  const setMultipleButtons = (): JSX.Element => {
    return (
      <div className={styles.multipleContainer}>
        {operationNames.map((value, index) => {
          const name = nameWithDots(value, isMobile ? MOBILE_WORD_LENGTH : DESKTOP_WORD_LENGTH);
          return (
            <button
              key={index}
              className={styles.runButton}
              onClick={() => run(makeRequest(value))}
            >
              {`► ${name}`}
            </button>
          );
        })}
      </div>
    );
  };

  const onClickHandler = (): void => {
    const {
      playgroundSlice: { operation },
    } = store.getState();
    const names = getOperationNames(operation);

    if (names.length > 1) {
      setOperationNames(names);
      document.addEventListener('click', () => setOperationNames([]), { once: true });
    } else {
      run(makeRequest());
    }
  };

  return (
    <div className={classNames(styles.container, isMobile && styles.mobile)}>
      {isMultipleRequest ? (
        setMultipleButtons()
      ) : (
        <button className={styles.runButton} onClick={onClickHandler}>
          {t('run')}
        </button>
      )}
    </div>
  );
};
