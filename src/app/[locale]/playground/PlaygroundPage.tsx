'use client';
import { useWidthState } from './PlaygroundPage.hook';
import { TestSection } from '@/components/playgroundSections/testSection/testSection';
import { DesktopPlayground } from '@/components/layout/playgroundLayout/DesktopPlayground/DesktopPlayground';
import styles from './page.module.scss';
import { MobilePlayground } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground';
import { VerticalResizeContainer } from '@/components/layout/playgroundLayout/VerticalResizeContainer/VerticalResizeContainer';
import { LS_KEYS, PageList } from '@/common';
import { OperationSection } from '@/components/playgroundSections/OperationSection/OperationSection';
import { ResponseSection } from '@/components/playgroundSections/ResponseSection/ResponseSection';
import { VarsSection } from '@/components/playgroundSections/VarsSection/VarsSection';
import { TabsBlock } from '@/components/layout/playgroundLayout/TabsBlock/TabsBlock';
import { redirect } from 'next/navigation';
import { usePathWithLocale, useSetStore } from '@/common/hook';
import { firebaseAuth } from '@/firebase';
import { useIdToken } from 'react-firebase-hooks/auth';
import { HeadersSection } from '@/components/playgroundSections/HeadersSection/HeadersSection';
import { DocumentationSection } from '@/components/playgroundSections/DocumentationSection/DocumentationSection';

export default function PlaygroundPage(): JSX.Element {
  const isMobileView = useWidthState();
  const [welcomePage] = usePathWithLocale([PageList.welcome]);
  const [user, loading] = useIdToken(firebaseAuth);
  useSetStore();

  if (!loading && !user) redirect(welcomePage);

  return (
    <div className={styles.playground}>
      {isMobileView ? (
        <MobilePlayground>
          {{
            documentation: <DocumentationSection />,
            resizeMobileBlock: (
              <VerticalResizeContainer lsKey={LS_KEYS.MOBILE_VERTICAL_BLOCK_SIZE} isMobile={true}>
                {{
                  topBlock: (
                    <TabsBlock>
                      {{
                        operation: <OperationSection />,
                        vars: <VarsSection />,
                        headers: <HeadersSection />,
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
            documentation: <DocumentationSection />,
            operation: (
              <VerticalResizeContainer lsKey={LS_KEYS.DESKTOP_VERTICAL_BLOCK_SIZE}>
                {{
                  topBlock: <OperationSection />,
                  bottomBlock: (
                    <TabsBlock>
                      {{
                        vars: <VarsSection />,
                        headers: <HeadersSection />,
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
