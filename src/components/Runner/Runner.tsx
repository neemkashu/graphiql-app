'use client';
import { getOperationNames, makeRequest, nameWithDots } from '@/common/helper';
import { useRequest } from '@/common/hook';
import { DESKTOP_WORD_LENGTH, MOBILE_WORD_LENGTH } from '@/components/Runner/Runner.const';
import { store } from '@/redux/store';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './Runner.module.scss';

export const Runner = ({ isMobile }: { isMobile?: boolean }): JSX.Element => {
  const t = useTranslations('Playground');
  const run = useRequest();
  const [operationNames, setOperationNames] = useState<string[]>([]);
  const multipleRequest = operationNames.length > 1;

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

  const removeOperationNames = (): void => {
    setOperationNames([]);
    document.removeEventListener('click', removeOperationNames);
  };

  const onClickHandler = (): void => {
    const operation = store.getState().playgroundSlice.operation;
    const names = getOperationNames(operation);

    if (names.length > 1) {
      setOperationNames(names);
      document.addEventListener('click', removeOperationNames);
    } else {
      run(makeRequest());
    }
  };

  return (
    <div className={classNames(styles.container, isMobile && styles.mobile)}>
      {multipleRequest ? (
        setMultipleButtons()
      ) : (
        <button className={styles.runButton} onClick={onClickHandler}>
          {t('run')}
        </button>
      )}
    </div>
  );
};
