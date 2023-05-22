'use client';
import { FieldSplit, MultipleChildren } from '@/common';
import {
  HIDE_BTN_ICON,
  HIDE_PLAYGROUND_SIZE,
  MAX_PANE_SIZE,
  MIN_PANE_SIZE,
  SHOW_BTN_ICON,
} from '@/components';
import { SHOW_PLAYGROUND_SIZE } from '@/components/layout/playgroundLayout/DesktopPlayground/DesktopPlayground.const';
import { PageSpinner } from '@/components/loading';
import { Runner } from '@/components/Runner/Runner';
import { useLazyGetSchemaQuery } from '@/redux';
import classNames from 'classnames';
import { buildClientSchema } from 'graphql';
import { useTranslations } from 'next-intl';
import React, { lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import styles from './DesktopPlayground.module.scss';

const sashRender = (_: number, active: boolean): ReactNode => (
  <SashContent active={active} type="vscode" />
);

export const DesktopPlayground = ({ children }: MultipleChildren): JSX.Element => {
  const [operation, response] = children;
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [sizes, setSizes] = useState(HIDE_PLAYGROUND_SIZE);
  const [schemaElement, setSchemaElement] = useState<JSX.Element | undefined>();
  const [fetchScheme, { data, isLoading, isError }] = useLazyGetSchemaQuery();

  const toggleLeftPane = (): void => {
    if (!data) fetchScheme();
    setIsDocsOpen(!isDocsOpen);
    setSizes(isDocsOpen ? HIDE_PLAYGROUND_SIZE : SHOW_PLAYGROUND_SIZE);
  };
  const t = useTranslations('Playground');

  useEffect(() => {
    if (data && !schemaElement) {
      const Schema = lazy(() => import('@/components/playgroundSections/Schema/Schema')); // не выносится в константу
      setSchemaElement(<Schema schema={buildClientSchema(data)} />);
    }
  }, [data, schemaElement]);

  return (
    <>
      <button onClick={toggleLeftPane} className={styles.hideButton}>
        {isDocsOpen ? HIDE_BTN_ICON : SHOW_BTN_ICON}
      </button>
      <SplitPane
        split={FieldSplit.vertical}
        sizes={sizes}
        onChange={setSizes}
        sashRender={sashRender}
      >
        <Pane minSize={isDocsOpen ? MIN_PANE_SIZE : 0} maxSize={isDocsOpen ? MAX_PANE_SIZE : 0}>
          <div className={classNames(styles.pane, styles.paneLeft)}>
            <Suspense fallback={<PageSpinner isSmall />}>
              {data && schemaElement}
              {isLoading && <PageSpinner isSmall />}
              {isError && <p>Schema not found</p>}
            </Suspense>
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
