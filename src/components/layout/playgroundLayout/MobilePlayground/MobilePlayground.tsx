'use client';
import { makeRequest } from '@/common/helper';
import { useRequest } from '@/common/hook';
import { Spinner } from '@/components';
import { MobilePage } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground.enum';
import { Runner } from '@/components/Runner/Runner';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';
import styles from './MobilePlayground.module.scss';

export const MobilePlayground = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  const [documentation, resizeMobileBlock] = children;
  const [page, setPage] = useState(MobilePage.second);
  const isPageFirst = page === MobilePage.first;
  const firstButtonOnClickHandler = (): void => {
    setPage(MobilePage.first);
  };
  const run = useRequest();
  const secondButtonOnClickHandler = (): void => {
    isPageFirst ? setPage(MobilePage.second) : run(makeRequest());
  };
  const t = useTranslations('Playground');

  return (
    <section className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={classNames(styles.page, styles.firstPage, isPageFirst && styles.active)}>
          <h4 className={styles.title}>{t('documentation')}</h4>
          <Suspense fallback={<Spinner isSmall={true} />}>{documentation}</Suspense>
        </div>
        <div className={classNames(styles.page, styles.secondPage, !isPageFirst && styles.active)}>
          {resizeMobileBlock}
        </div>
      </div>
      <nav className={styles.nav}>
        <button
          className={classNames(styles.navButton, isPageFirst && styles.active)}
          onClick={firstButtonOnClickHandler}
        >
          {t('documentation')}
        </button>
        {isPageFirst ? (
          <button className={styles.navButton} onClick={secondButtonOnClickHandler}>
            {t('operation')}
          </button>
        ) : (
          <Runner isMobile={true} />
        )}
      </nav>
    </section>
  );
};
