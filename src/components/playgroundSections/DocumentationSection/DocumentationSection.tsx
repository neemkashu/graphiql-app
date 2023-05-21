'use client';
import { useGetSchemaQuery } from '@/redux';
import { Spinner } from '@/components/loading';
import { Schema } from './Schema/Schema';
import { buildClientSchema } from 'graphql/utilities';
import styles from './DocumentationSection.module.scss';

export const DocumentationSection = (): JSX.Element => {
  const { currentData, isFetching } = useGetSchemaQuery();

  if (isFetching || !currentData)
    return (
      <section className={styles.spinner}>
        <Spinner />
      </section>
    );

  const schema = buildClientSchema(currentData);

  return (
    <section className={styles.section}>
      <Schema schema={schema} />
    </section>
  );
};
