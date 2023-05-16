'use client';
import { MobilePlaygroundProps } from '@/components';
import { MobilePage } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground.enum';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './MobilePlayground.module.scss';
import { useRequest } from '@/common/hook';
import { store } from '@/redux';

export const MobilePlayground = ({
  children: { documentation, resizeMobileBlock },
}: MobilePlaygroundProps): JSX.Element => {
  const [page, setPage] = useState(MobilePage.second);
  const isPageFirst = (): boolean => page === MobilePage.first;
  const firstButtonOnClickHandler = (): void => {
    setPage(MobilePage.first);
  };
  const run = useRequest();
  const secondButtonOnClickHandler = (): void => {
    isPageFirst() ? setPage(MobilePage.second) : run(store.getState().playgroundSlice.operation);
  };
  const t = useTranslations('Playground');

  return (
    <section className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={classNames(styles.page, styles.firstPage, isPageFirst() && styles.active)}>
          <h4 className={styles.title}>{t('documentation')}</h4>
          {documentation}
        </div>
        <div
          className={classNames(styles.page, styles.secondPage, !isPageFirst() && styles.active)}
        >
          {resizeMobileBlock}
        </div>
      </div>
      <nav className={styles.nav}>
        <button
          className={classNames(styles.navButton, isPageFirst() && styles.active)}
          onClick={firstButtonOnClickHandler}
        >
          {t('documentation')}
        </button>
        <button
          className={classNames(styles.navButton, !isPageFirst() && styles.run)}
          onClick={secondButtonOnClickHandler}
        >
          {isPageFirst() ? t('operation') : t('run')}
        </button>
      </nav>
    </section>
  );
};
