'use client';
import { LS_KEYS, PageList } from '@/common';
import { usePathWithLocale, useSetStore } from '@/common/hook';
import { DesktopPlayground } from '@/components/layout/playgroundLayout/DesktopPlayground/DesktopPlayground';
import { MobilePlayground } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground';
import { TabsBlock } from '@/components/layout/playgroundLayout/TabsBlock/TabsBlock';
import { VerticalResizeContainer } from '@/components/layout/playgroundLayout/VerticalResizeContainer/VerticalResizeContainer';
import { HeadersSection } from '@/components/playgroundSections/HeadersSection/HeadersSection';
import { OperationSection } from '@/components/playgroundSections/OperationSection/OperationSection';
import { ResponseSection } from '@/components/playgroundSections/ResponseSection/ResponseSection';
import { VarsSection } from '@/components/playgroundSections/VarsSection/VarsSection';
import { PlaygroundToast } from '@/components/toasts/PlaygroundToast/PlaygroundToast';
import { firebaseAuth } from '@/firebase';
import { errorSelector } from '@/redux';
import { redirect } from 'next/navigation';
import { useIdToken } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { DocumentationSection } from '@/components/playgroundSections/DocumentationSection/DocumentationSection';
import styles from './page.module.scss';
import { useWidthState } from './PlaygroundPage.hook';

export default function PlaygroundPage(): JSX.Element {
  const isMobileView = useWidthState();
  const [welcomePage] = usePathWithLocale([PageList.welcome]);
  const errors = useSelector(errorSelector);
  const [user, loading] = useIdToken(firebaseAuth);
  useSetStore();

  if (!loading && !user) redirect(welcomePage);

  return (
    <>
      {errors.length ? <PlaygroundToast errors={errors} /> : null}
      <div className={styles.playground}>
        {isMobileView ? (
          <MobilePlayground>
            {/* @ts-expect-error Server Component */}
            <DocumentationSection />
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
          </MobilePlayground>
        ) : (
          <DesktopPlayground>
            {/* @ts-expect-error Server Component */}
            <DocumentationSection />
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
            <ResponseSection />
          </DesktopPlayground>
        )}
      </div>
    </>
  );
}
