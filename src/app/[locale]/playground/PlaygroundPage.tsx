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
import { useAuthState } from 'react-firebase-hooks/auth';
import { HeadersSection } from '@/components/playgroundSections/HeadersSection/HeadersSection';
import { useSelector } from 'react-redux';
import { errorSelector } from '@/redux';
import { PlaygroundToast } from '@/components/toasts/PlaygroundToast/PlaygroundToast';

export default function PlaygroundPage({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  const isMobileView = useWidthState();
  const [welcomePage] = usePathWithLocale([PageList.welcome]);
  const [user, loading] = useAuthState(firebaseAuth);
  const errors = useSelector(errorSelector);
  useSetStore();

  if (!loading && (!isLoggedIn || !user)) redirect(welcomePage);

  return (
    <>
      {errors.length ? <PlaygroundToast errors={errors} /> : null}
      <div className={styles.playground}>
        {isMobileView ? (
          <MobilePlayground>
            {{
              documentation: <TestSection>Docs</TestSection>,
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
              documentation: <TestSection>Docs</TestSection>,
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
    </>
  );
}
