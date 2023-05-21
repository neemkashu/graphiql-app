// 'use client';
import { ORIGIN } from '@/common';
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import { lazy, Suspense } from 'react';
import styles from './DocumentationSection.module.scss';

export const DocumentationSection = async (): Promise<JSX.Element> => {
  console.log('render DocumentationSection');
  const opt = {
    url: '',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  };

  try {
    const currentData = await fetch(ORIGIN, opt);
    const { data } = await currentData.json();
    const Schema = lazy(() => import('./Schema/Schema'));
    const schema = buildClientSchema(data);

    return (
      <section className={styles.section}>
        <Suspense fallback={'Code suspense'}>
          <Schema schema={schema} />
        </Suspense>
      </section>
    );
  } catch {
    return <div>Schema not found</div>;
  }
};
