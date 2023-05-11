'use client';
import {
  DEFAULT_PLAYGROUND_SIZE,
  HIDE_BTN_ICON,
  HIDE_PANE_PLAYGROUND_SIZE,
  HIDE_PANE_SIZE,
  MIN_PANE_SIZE,
  SHOW_BTN_ICON,
  Split,
} from '@/components';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './ResizableContainer.module.scss';
import { usePLayGroundSize } from './ResizableContainer.hook';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const ResizableContainer = (): JSX.Element => {
  const [sizes, setSizes] = usePLayGroundSize();
  const [leftPaneSize] = sizes;

  const toggleLeftPane = (): void => {
    setSizes(leftPaneSize > HIDE_PANE_SIZE ? HIDE_PANE_PLAYGROUND_SIZE : DEFAULT_PLAYGROUND_SIZE);
  };

  return (
    <SplitPane split={Split.vertical} sizes={sizes} onChange={setSizes} sashRender={sashRender}>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneLeft)}>
          <button onClick={toggleLeftPane} className={styles.hideButton}>
            {leftPaneSize > HIDE_PANE_SIZE ? HIDE_BTN_ICON : SHOW_BTN_ICON}
          </button>
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
};
