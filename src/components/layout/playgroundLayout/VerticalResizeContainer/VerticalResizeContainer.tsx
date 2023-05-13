'use client';
import { FieldSplit } from '@/common';
import { useFieldSize } from '@/common/hook';
import {
  HIDE_BTN_ICON_VERTICAL,
  HIDE_PANE_SIZE,
  MIN_VERTICAL_PANE_SIZE,
  SHOW_BTN_ICON_VERTICAL,
  VerticalContainerProps,
  DEFAULT_VERTICAL_CONTAINER_SIZE,
  HIDE_PANE_VERTICAL_CONTAINER_SIZE,
  VerticalContainerSize,
} from '@/components';
import React, { ReactNode } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './VerticalResizeContainer.module.scss';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const VerticalResizeContainer = ({
  children: { topBlock, bottomBlock },
  lsKey,
}: VerticalContainerProps): JSX.Element => {
  const [sizes, setSizes] = useFieldSize<VerticalContainerSize>(
    DEFAULT_VERTICAL_CONTAINER_SIZE,
    lsKey
  );
  const [, bottomPane] = sizes;

  const toggleBottomPane = (): void => {
    setSizes(
      bottomPane >= MIN_VERTICAL_PANE_SIZE
        ? HIDE_PANE_VERTICAL_CONTAINER_SIZE
        : DEFAULT_VERTICAL_CONTAINER_SIZE
    );
  };

  return (
    <SplitPane
      split={FieldSplit.horizontal}
      sizes={sizes}
      onChange={setSizes}
      sashRender={sashRender}
    >
      <Pane minSize={MIN_VERTICAL_PANE_SIZE}>{topBlock}</Pane>
      <Pane minSize={MIN_VERTICAL_PANE_SIZE}>
        <button onClick={toggleBottomPane} className={styles.hideButton}>
          {bottomPane > HIDE_PANE_SIZE ? HIDE_BTN_ICON_VERTICAL : SHOW_BTN_ICON_VERTICAL}
        </button>
        {bottomBlock}
      </Pane>
    </SplitPane>
  );
};
