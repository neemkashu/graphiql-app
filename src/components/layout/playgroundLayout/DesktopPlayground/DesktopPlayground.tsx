'use client';
import { FieldSplit, LS_KEYS, MultipleChildren } from '@/common';
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
import { Runner } from '@/components/Runner/Runner';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useState } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './DesktopPlayground.module.scss';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const DesktopPlayground = ({ children }: MultipleChildren): JSX.Element => {
  const [documentation, operation, response] = children;
  const [isDocs, setIsDocs] = useState(false);
  const [sizes, setSizes] = useState([0, 9999, 9999]);

  const toggleLeftPane = (): void => {
    setIsDocs(!isDocs);
    setSizes(isDocs ? [0, 9999, 9999] : [9999, 9999, 9999]);
  };
  const t = useTranslations('Playground');

  return (
    <>
      <button onClick={toggleLeftPane} className={styles.hideButton}>
        {isDocs ? HIDE_BTN_ICON : SHOW_BTN_ICON}
      </button>
      <SplitPane
        split={FieldSplit.vertical}
        sizes={sizes}
        onChange={setSizes}
        sashRender={sashRender}
      >
        <Pane minSize={isDocs ? MIN_PANE_SIZE : 0} maxSize={isDocs ? 9999 : 0}>
          <div className={classNames(styles.pane, styles.paneLeft)}>
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
    </>
  );
};
