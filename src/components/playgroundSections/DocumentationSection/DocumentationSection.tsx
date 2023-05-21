import { Schema } from './Schema/Schema';
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import styles from './DocumentationSection.module.scss';
import { ORIGIN } from '@/common';

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

  const currentData = await fetch(ORIGIN, opt);
  const { data } = await currentData.json();
  const schema = buildClientSchema(data);

  return (
    <section className={styles.section}>
      <Schema schema={schema} />
    </section>
  );
};
