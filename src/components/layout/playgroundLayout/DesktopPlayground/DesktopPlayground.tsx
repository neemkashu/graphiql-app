'use client';
import { FieldSplit, LS_KEYS } from '@/common';
import { useFieldSize } from '@/common/hook';
import {
  DEFAULT_PLAYGROUND_SIZE,
  HIDE_BTN_ICON,
  HIDE_PANE_PLAYGROUND_SIZE,
  HIDE_PANE_SIZE,
  MIN_PANE_SIZE,
  PlaygroundSize,
  SHOW_BTN_ICON,
} from '@/components';
import { Spinner } from '@/components/loading';
import { Runner } from '@/components/Runner/Runner';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, { ReactNode, Suspense } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './DesktopPlayground.module.scss';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const DesktopPlayground = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  const [sizes, setSizes] = useFieldSize<PlaygroundSize>(
    DEFAULT_PLAYGROUND_SIZE,
    LS_KEYS.DESKTOP_PLAYGROUND_SIZE
  );
  const [leftPaneSize] = sizes;
  const [documentation, operation, response] = children;

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
            <Suspense fallback={<Spinner isSmall={true} />}>{documentation}</Suspense>
          </div>
        </div>
      </Pane>
      <Pane minSize={MIN_PANE_SIZE}>
        <div className={classNames(styles.pane, styles.paneCenter)}>
          <div className={styles.centerHeader}>
            <h4 className={styles.sectionTitle}>{t('operation')}</h4>
            <Runner />
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
