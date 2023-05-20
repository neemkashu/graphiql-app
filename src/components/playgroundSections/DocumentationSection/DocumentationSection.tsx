'use client';
import { useGetSchemaQuery } from '@/redux';
import { Spinner } from '@/components/loading';
import { getTypes } from './DocumentationSection.helper';
import styles from './DocumentationSection.module.scss';

export const DocumentationSection = (): JSX.Element => {
  const { currentData, isFetching } = useGetSchemaQuery();

  if (isFetching || !currentData)
    return (
      <section className={styles.spinner}>
        <Spinner />
      </section>
    );

  const types = getTypes(currentData);
  // console.log(types);
  const selectedType = types[0]; // todo: реализовать выбор

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{selectedType.name}</h3>
      {selectedType.description && <p>{selectedType.description}</p>}
      {selectedType.fields?.map((field) => (
        <div className={styles.field} key={field.name}>
          <span className={styles.name}>{field.name}</span>:
          <span className={styles.type}>{field.type}</span>
          {field.description && <p className={styles.description}>{field.description}</p>}
        </div>
      ))}
    </section>
  );
};
