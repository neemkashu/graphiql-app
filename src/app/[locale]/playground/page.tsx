/* eslint-disable no-console */
'use client';
import { useWidthState } from './page.hook';
import { TestSection } from '@/components/playgroundSections/testSection/testSection';
import { DesktopPlayground } from '@/components/layout/playgroundLayout/DesktopPlayground/DesktopPlayground';
import styles from './page.module.scss';
import { MobilePlayground } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground';
import { VerticalResizeContainer } from '@/components/layout/playgroundLayout/VerticalResizeContainer/VerticalResizeContainer';
import { LS_KEYS } from '@/common';
import { OperationSection } from '@/components/playgroundSections/OperationSection/OperationSection';
import { ResponseSection } from '@/components/playgroundSections/ResponseSection/ResponseSection';

export default function PlaygroundPage({
  params: { locale },
}: {
  params: { locale: string };
}): JSX.Element {
  const isMobileView = useWidthState();
  console.log(locale);

  return (
    <div className={styles.playground}>
      {isMobileView ? (
        <MobilePlayground>
          {{
            documentation: <TestSection>Docs</TestSection>,
            resizeMobileBlock: <TestSection>Resize</TestSection>,
          }}
        </MobilePlayground>
      ) : (
        <DesktopPlayground>
          {{
            documentation: <TestSection>Docs</TestSection>,
            operation: (
              <VerticalResizeContainer lsKey={LS_KEYS.DESKTOP_VERTICAL_BLOCK_SIZE}>
                {{
                  topBlock: <OperationSection />,
                  bottomBlock: <TestSection>Vars and Headers</TestSection>,
                }}
              </VerticalResizeContainer>
            ),
            response: <ResponseSection />,
          }}
        </DesktopPlayground>
      )}
    </div>
  );
}
