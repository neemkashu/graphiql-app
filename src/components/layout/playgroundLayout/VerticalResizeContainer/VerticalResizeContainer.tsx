'use client';
import { FieldSplit } from '@/common';
import { useFieldSize } from '@/common/hook';
import {
  DEFAULT_VERTICAL_CONTAINER_SIZE,
  MIN_VERTICAL_PANE_SIZE,
  setBottomPane,
  setButtonIcon,
  VerticalContainerProps,
  VerticalContainerSize,
} from '@/components';
import { useTranslations } from 'next-intl';
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
  isMobile,
}: VerticalContainerProps): JSX.Element => {
  const [sizes, setSizes] = useFieldSize<VerticalContainerSize>(
    DEFAULT_VERTICAL_CONTAINER_SIZE,
    lsKey
  );
  const t = useTranslations('Playground');
  const [, bottomPane] = sizes;

  const toggleBottomPane = (): void => {
    setSizes(setBottomPane(bottomPane));
  };

  return (
    <SplitPane
      split={FieldSplit.horizontal}
      sizes={sizes}
      onChange={setSizes}
      sashRender={sashRender}
    >
      <Pane minSize={MIN_VERTICAL_PANE_SIZE} className={styles.blockWrapper}>
        {topBlock}
      </Pane>

      <Pane minSize={MIN_VERTICAL_PANE_SIZE} className={styles.blockWrapper}>
        {isMobile ? (
          <div className={styles.header} onClick={toggleBottomPane}>
            <p className={styles.title}>{t('response')}</p>
            <button onClick={toggleBottomPane} className={styles.hideButton}>
              {setButtonIcon(bottomPane)}
            </button>
          </div>
        ) : (
          <button onClick={toggleBottomPane} className={styles.fixedHideButton}>
            {setButtonIcon(bottomPane)}
          </button>
        )}
        {bottomBlock}
      </Pane>
    </SplitPane>
  );
};
