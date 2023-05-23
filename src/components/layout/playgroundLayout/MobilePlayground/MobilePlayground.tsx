'use client';
import { PageSpinner } from '@/components/loading/PageSpinner/PageSpinner';
import { Runner } from '@/components/Runner/Runner';
import { useLazyGetSchemaQuery } from '@/redux';
import classNames from 'classnames';
import { buildClientSchema } from 'graphql';
import { useTranslations } from 'next-intl';
import { lazy, Suspense, useState } from 'react';
import styles from './MobilePlayground.module.scss';

export const MobilePlayground = ({ children }: { children: JSX.Element }): JSX.Element => {
  const t = useTranslations('Playground');
  const [isPageFirst, setIsPageFirst] = useState(false);
  const [schemaElement, setSchemaElement] = useState<JSX.Element | null>(null);
  const [fetchScheme, { data, isLoading, isError }] = useLazyGetSchemaQuery();

  const firstButtonOnClickHandler = (): void => {
    if (!data) fetchScheme();
    setIsPageFirst(true);
  };

  const secondButtonOnClickHandler = (): void => {
    setIsPageFirst(false);
  };

  if (data && !schemaElement) {
    const Schema = lazy(() => import('@/components/playgroundSections/Schema/Schema'));
    setSchemaElement(<Schema schema={buildClientSchema(data)} />);
  }

  return (
    <section className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={classNames(styles.page, styles.firstPage, isPageFirst && styles.active)}>
          <Suspense fallback={<PageSpinner isSmall />}>
            {schemaElement}
            {isLoading && <PageSpinner isSmall />}
            {isError && <p>Schema not found</p>}
          </Suspense>
        </div>
        <div className={classNames(styles.page, styles.secondPage, !isPageFirst && styles.active)}>
          {children}
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
