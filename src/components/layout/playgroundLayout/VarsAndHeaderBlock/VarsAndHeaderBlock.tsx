'use client';
import { VarsAndHeaderBlockProps, ActiveVarsAndHeaders } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './VarsAndHeaderBlock.module.scss';

export const VarsAndHeaderBlock = ({
  children: { vars, headers },
}: VarsAndHeaderBlockProps): JSX.Element => {
  const [activeBlock, setActiveBlock] = useState(ActiveVarsAndHeaders.vars);
  const onClickHandler = (block: ActiveVarsAndHeaders): void => {
    setActiveBlock(block);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button
          className={classNames(
            styles.navButton,
            activeBlock === ActiveVarsAndHeaders.vars && styles.active
          )}
          onClick={(): void => onClickHandler(ActiveVarsAndHeaders.vars)}
        >
          Vars
        </button>
        <button
          className={classNames(
            styles.navButton,
            activeBlock === ActiveVarsAndHeaders.headers && styles.active
          )}
          onClick={(): void => onClickHandler(ActiveVarsAndHeaders.headers)}
        >
          Headers
        </button>
      </nav>
      <div className={styles.blockContainer}>
        {activeBlock === ActiveVarsAndHeaders.vars ? vars : headers}
      </div>
    </div>
  );
};
