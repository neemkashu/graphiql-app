'use client';
import { getOperationNames, makeRequest, nameWithDots } from '@/common/helper';
import { useRequest } from '@/common/hook';
import {
  DESKTOP_WORD_LENGTH,
  INVALID_JSON,
  MOBILE_WORD_LENGTH,
} from '@/components/Runner/Runner.const';
import { InvalidJsonToast } from '@/components/toasts/InvalidJsonToast/InvalidJsonToast';
import { RickAndMortyReq } from '@/redux';
import { store } from '@/redux/store';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './Runner.module.scss';

export const Runner = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');
  const sendRequest = useRequest();
  const [jsonInfo, setJsonInfo] = useState<string | null>(null);
  const [operationNames, setOperationNames] = useState<string[]>([]);
  const isMultipleRequest = operationNames.length > 1;

  const run = ([request, isJsonValid]: [RickAndMortyReq, boolean]): void => {
    sendRequest(request);
    setJsonInfo(isJsonValid ? null : INVALID_JSON);
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
    <>
      <div className={classNames(styles.container, isMobile && styles.mobile)}>
        {isMultipleRequest ? (
          setMultipleButtons()
        ) : (
          <button className={styles.runButton} onClick={onClickHandler}>
            {t('run')}
          </button>
        )}
      </div>
      {jsonInfo ? <InvalidJsonToast info={jsonInfo} /> : null}
    </>
  );
};
