'use client';
import { FieldSplit, LS_KEYS } from '@/common';
import { useFieldSize } from '@/common/hook';
import {
  DEFAULT_PLAYGROUND_SIZE,
  DesktopPlaygroundProps,
  HIDE_BTN_ICON,
  HIDE_PANE_PLAYGROUND_SIZE,
  HIDE_PANE_SIZE,
  MIN_PANE_SIZE,
  PlaygroundSize,
  SHOW_BTN_ICON,
} from '@/components';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './DesktopPlayground.module.scss';
import { useTranslations } from 'next-intl';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const DesktopPlayground = ({
  children: { documentation, operation, response },
}: DesktopPlaygroundProps): JSX.Element => {
  const [sizes, setSizes] = useFieldSize<PlaygroundSize>(
    DEFAULT_PLAYGROUND_SIZE,
    LS_KEYS.DESKTOP_PLAYGROUND_SIZE
  );
  const [leftPaneSize] = sizes;

  const toggleLeftPane = (): void => {
    setSizes(leftPaneSize > HIDE_PANE_SIZE ? HIDE_PANE_PLAYGROUND_SIZE : DEFAULT_PLAYGROUND_SIZE);
  };
  const t = useTranslations('Playground');

  return (
    <SplitPane
      split={FieldSplit.vertical}
      sizes={sizes}
      onChange={setSizes}
      sashRender={sashRender}
    >
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneLeft)}>
          <button onClick={toggleLeftPane} className={styles.hideButton}>
            {leftPaneSize > HIDE_PANE_SIZE ? HIDE_BTN_ICON : SHOW_BTN_ICON}
          </button>
          <div className={styles.docsSection}>
            <h4 className={styles.sectionTitle}>{t('documentation')}</h4>
            {documentation}
          </div>
        </div>
      </Pane>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneCenter)}>
          <div className={styles.centerHeader}>
            <h4 className={styles.sectionTitle}>{t('operation')}</h4>
            <button className={styles.runButton}>&#9658; {t('run')}</button>
          </div>
          {operation}
        </div>
      </Pane>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={styles.pane}>
          <h4 className={styles.sectionTitle}>{t('response')}</h4>
          {response}
        </div>
      </Pane>
    </SplitPane>
  );
};
