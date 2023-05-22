'use client';
import { useLazyGetSchemaQuery } from '@/redux';
import { Spinner } from '@/components/loading';
import { Schema } from './Schema/Schema';
import { IntrospectionQuery, buildClientSchema } from 'graphql/utilities';
import styles from './DocumentationSection.module.scss';

export const DocumentationSection = (): JSX.Element => {
  const [trigger, { currentData, isFetching }] = useLazyGetSchemaQuery();

  return (
    <section className={styles.section}>
      <div onClick={() => trigger()}>trigger</div>
      <SchemaSection prop={{ currentData, isFetching }} />
    </section>
  );
};

const SchemaSection = ({
  prop: { currentData, isFetching },
}: {
  prop: { currentData: IntrospectionQuery | undefined; isFetching: boolean };
}): JSX.Element => {
  if (!currentData) {
    return <section className={styles.spinner} />;
  }

  return (
    <section className={styles.section}>
      {isFetching ? (
        <div className={styles.loaderWrapper}>
          <Spinner />
        </div>
      ) : (
        <Schema schema={buildClientSchema(currentData)} />
      )}
    </section>
  );
};
