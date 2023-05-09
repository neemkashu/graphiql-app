'use client';
import styles from './ResizableContainer.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import {
  RoundButton,
  DEFAULT_PG_SIZE,
  HIDE_LEFT_PANE_ARR,
  HIDE_LEFT_PANE_SIZE,
  LS_PG_SIZE,
  MIN_PANE_SIZE,
  SHOW_LEFT_PANE_ARR,
  Split,
  HIDE_BTN_ICON,
  SHOW_BTN_ICON,
} from '@/components';
import classNames from 'classnames';

export default function ResizableContainer(): JSX.Element {
  const lsState = localStorage.getItem(LS_PG_SIZE);
  const [sizes, setSizes] = useState(lsState ? JSON.parse(lsState) : DEFAULT_PG_SIZE);
  const currentSizeRef = useRef(sizes);
  const [leftPaneSize] = sizes;

  const setLs = (): void => {
    localStorage.setItem(LS_PG_SIZE, JSON.stringify(currentSizeRef.current));
  };

  useEffect((): void => {
    currentSizeRef.current = sizes;
  }, [sizes]);

  useEffect((): (() => void) => {
    window.addEventListener('beforeunload', setLs);
    return (): void => {
      window.removeEventListener('beforeunload', setLs);
      setLs();
    };
  }, []);

  const toggleLeftPane = (): void => {
    setSizes(leftPaneSize > HIDE_LEFT_PANE_SIZE ? HIDE_LEFT_PANE_ARR : SHOW_LEFT_PANE_ARR);
  };

  return (
    <SplitPane split={Split.vertical} sizes={sizes} onChange={setSizes}>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneLeft)}>
          <div className={styles.hideButton}>
            <RoundButton action={toggleLeftPane}>
              {leftPaneSize > HIDE_LEFT_PANE_SIZE ? HIDE_BTN_ICON : SHOW_BTN_ICON}
            </RoundButton>
          </div>
          <div>Documentation</div>
        </div>
      </Pane>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneCenter)}>Operation</div>
      </Pane>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={styles.pane}>Response</div>
      </Pane>
    </SplitPane>
  );
}
