'use client';

import { GraphQLSchema } from 'graphql';
import { useState } from 'react';
import { getTypes } from './Schema.helper';
import { Types } from './Schema.interface';
import styles from './Schema.module.scss';
import { ROOT_DESCR, ROOT_NAME } from './Schema.const';

export default function Schema({ schema }: { schema: GraphQLSchema }): JSX.Element {
  const rootQuery = schema.getQueryType();
  const types = getTypes(schema);
  const docRoot = {
    name: ROOT_NAME,
    description: ROOT_DESCR,
    fields: [
      {
        name: rootQuery?.name ?? '',
        type: rootQuery?.name ?? '',
        args: [],
        description: rootQuery?.description ?? '',
      },
    ],
  };
  const [docHistory, setDocHistory] = useState<Types[]>([docRoot]);
  const { name, description, fields } = docHistory[docHistory.length - 1];

  const handleClick = (fieldType: string): void => {
    const typeName = fieldType.replace(/\[|\]|!/g, '');
    const type = types.find((type) => type.name === typeName);
    if (type) setDocHistory([...docHistory, type]);
  };

  const handleBack = (): void => {
    setDocHistory(docHistory.slice(0, docHistory.length - 1));
  };

  return (
    <>
      {docHistory.length > 1 && (
        <button className={styles.back} onClick={handleBack}>
          {` < ${docHistory[docHistory.length - 2].name} `}
        </button>
      )}
      <h3 className={styles.title}>{name}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {fields?.map(({ name, args, type, description }) => (
        <div className={styles.field} key={name}>
          <span className={styles.name}>{name}</span>
          {!!args.length && (
            <div className={styles.args}>
              {args.map((arg) => (
                <div className={styles.arg} key={arg.name}>
                  <span className={styles.name}>{arg.name}</span>
                  <button className={styles.type} onClick={() => handleClick(arg.type || '')}>
                    : {arg.type}
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className={styles.type} onClick={() => handleClick(type || '')}>
            : {type}
          </button>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      ))}
    </>
  );
}
