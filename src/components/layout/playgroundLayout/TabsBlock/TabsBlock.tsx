'use client';
import { TabsList, TabsBlockProps } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './TabsBlock.module.scss';

export const TabsBlock = ({
  children: { operation, vars, headers },
}: TabsBlockProps): JSX.Element => {
  const [activeBlock, setActiveBlock] = useState(operation ? TabsList.operation : TabsList.vars);
  const onClickHandler = (block: TabsList): void => {
    setActiveBlock(block);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {operation && (
          <button
            className={classNames(
              styles.navButton,
              activeBlock === TabsList.operation && styles.active
            )}
            onClick={(): void => onClickHandler(TabsList.operation)}
          >
            Operation
          </button>
        )}
        <button
          className={classNames(styles.navButton, activeBlock === TabsList.vars && styles.active)}
          onClick={(): void => onClickHandler(TabsList.vars)}
        >
          Variables
        </button>
        <button
          className={classNames(
            styles.navButton,
            activeBlock === TabsList.headers && styles.active
          )}
          onClick={(): void => onClickHandler(TabsList.headers)}
        >
          Headers
        </button>
      </nav>
      <div className={styles.blockContainer}>
        {activeBlock === TabsList.operation && operation}
        {activeBlock === TabsList.vars && vars}
        {activeBlock === TabsList.headers && headers}
      </div>
    </div>
  );
};
