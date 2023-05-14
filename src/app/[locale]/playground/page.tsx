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
import { TabsBlock } from '@/components';
import { VarsSection } from '@/components/playgroundSections/VarsSection/VarsSection';

export default function PlaygroundPage(): JSX.Element {
  const isMobileView = useWidthState();

  return (
    <div className={styles.playground}>
      {isMobileView ? (
        <MobilePlayground>
          {{
            documentation: <TestSection>Docs</TestSection>,
            resizeMobileBlock: (
              <VerticalResizeContainer lsKey={LS_KEYS.MOBILE_VERTICAL_BLOCK_SIZE}>
                {{
                  topBlock: (
                    <TabsBlock>
                      {{
                        operation: <OperationSection />,
                        vars: <VarsSection />,
                        headers: <TestSection> </TestSection>,
                      }}
                    </TabsBlock>
                  ),
                  bottomBlock: <ResponseSection isMobile={true} />,
                }}
              </VerticalResizeContainer>
            ),
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
                  bottomBlock: (
                    <TabsBlock>
                      {{
                        vars: <VarsSection />,
                        headers: <TestSection> </TestSection>,
                      }}
                    </TabsBlock>
                  ),
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
