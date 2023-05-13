'use client';
import { MobilePlaygroundProps } from '@/components';
import { MobilePage } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground.enum';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './MobilePlayground.module.scss';

export const MobilePlayground = ({
  children: { documentation, resizeMobileBlock },
}: MobilePlaygroundProps): JSX.Element => {
  const [page, setPage] = useState(MobilePage.first);
  const isPageFirs = (): boolean => page === MobilePage.first;
  const onClickHandler = (page: MobilePage): void => {
    setPage(page);
  };

  return (
    <section className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={classNames(styles.page, styles.firstPage, isPageFirs() && styles.active)}>
          <h4 className={styles.title}>Documentation</h4>
          {documentation}
        </div>
        <div className={classNames(styles.page, styles.secondPage, !isPageFirs() && styles.active)}>
          {resizeMobileBlock}
        </div>
      </div>
      <nav className={styles.nav}>
        <button
          className={classNames(styles.navButton, isPageFirs() && styles.active)}
          onClick={(): void => onClickHandler(MobilePage.first)}
        >
          Documentation
        </button>
        <button
          className={classNames(styles.navButton, !isPageFirs() && styles.active)}
          onClick={(): void => onClickHandler(MobilePage.second)}
        >
          Operation
        </button>
      </nav>
    </section>
  );
};
