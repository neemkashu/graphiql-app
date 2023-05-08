// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import styles from './page.module.scss';
import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { ButtonStyle, MainButton } from '../buttons';

export default function ResizableContainer(): JSX.Element {
  const [sizes, setSizes] = useState(['33%', '33%', '33%']);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const aaa = (): void => {
    setSizes([0]);
  };

  return (
    <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
      <Pane minSize={250}>
        <div style={{ ...layoutCSS }}>
          <MainButton style={ButtonStyle.active} disabled={false} action={aaa}></MainButton>
        </div>
      </Pane>
      <Pane minSize={250}>
        <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
      </Pane>
      <Pane minSize={250}>
        <div style={{ ...layoutCSS }}>pane1</div>
      </Pane>
    </SplitPane>
  );
}
