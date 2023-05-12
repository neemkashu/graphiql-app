/* eslint-disable no-console */
'use client';
import { useWidthState } from './page.hook';
import { TestSection } from '@/components/playgroundSections/testSection/testSection';
import { DesktopPlayground } from '@/components/layout/playgroundLayout/DesktopPlayground/DesktopPlayground';
import styles from './page.module.scss';

export default function PlaygroundPage(): JSX.Element {
  const isMobileView = useWidthState();

  return (
    <div className={styles.playground}>
      {isMobileView ? (
        'mobile'
      ) : (
        <DesktopPlayground>
          {{
            documentation: <TestSection>Docs</TestSection>,
            operation: <TestSection>Op</TestSection>,
            response: <TestSection>Resp</TestSection>,
          }}
        </DesktopPlayground>
      )}
    </div>
  );
}
