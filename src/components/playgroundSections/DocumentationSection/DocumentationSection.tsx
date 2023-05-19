'use client';
import { useGetSchemaQuery } from '@/redux';
import { buildClientSchema, printSchema, typeFromAST, parseType } from 'graphql';
import styles from './DocumentationSection.module.scss';
import { Spinner } from '@/components/loading';

export const DocumentationSection = (): JSX.Element => {
  const { data, isFetching } = useGetSchemaQuery();

  if (isFetching || !data)
    return (
      <section className={styles.section}>
        <Spinner />
      </section>
    );

  const schema = printSchema(buildClientSchema(data));
  const schema2 = buildClientSchema(data);
  const schema3 = JSON.stringify(data.__schema.types[0], null, '\t');
  // console.log(schema);
  // console.log(typeFromAST(schema2, parseType(`[Query]!`)));
  // console.log(schema3);

  return <section className={styles.section}></section>;
};
