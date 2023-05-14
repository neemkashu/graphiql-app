'use client';
import { MobilePlaygroundProps } from '@/components';
import { MobilePage } from '@/components/layout/playgroundLayout/MobilePlayground/MobilePlayground.enum';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './MobilePlayground.module.scss';

export const MobilePlayground = ({
  children: { documentation, resizeMobileBlock },
}: MobilePlaygroundProps): JSX.Element => {
  const [page, setPage] = useState(MobilePage.second);
  const isPageFirs = (): boolean => page === MobilePage.first;
  const firstButtonOnClickHandler = (): void => {
    setPage(MobilePage.first);
  };
  const secondButtonOnClickHandler = (): void => {
    // eslint-disable-next-line no-console
    isPageFirs() ? setPage(MobilePage.second) : console.log('run');
  };
  const t = useTranslations('Playground');

  return (
    <section className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={classNames(styles.page, styles.firstPage, isPageFirs() && styles.active)}>
          <h4 className={styles.title}>{t('documentation')}</h4>
          {documentation}
        </div>
        <div className={classNames(styles.page, styles.secondPage, !isPageFirs() && styles.active)}>
          {resizeMobileBlock}
        </div>
      </div>
      <nav className={styles.nav}>
        <button
          className={classNames(styles.navButton, isPageFirs() && styles.active)}
          onClick={firstButtonOnClickHandler}
        >
          {t('documentation')}
        </button>
        <button
          className={classNames(styles.navButton, !isPageFirs() && styles.run)}
          onClick={secondButtonOnClickHandler}
        >
          {isPageFirs() ? t('operation') : t('run')}
        </button>
      </nav>
    </section>
  );
};
