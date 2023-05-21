'use client';

import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { getTypes } from './Schema.helper';
import { Types } from '../Schema/Schema.interface';
import styles from './Schema.module.scss';
import { ROOT_DESCR, ROOT_NAME } from './Schema.const';

export const Schema = ({ schema }: { schema: GraphQLSchema }): JSX.Element => {
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
  const [currentType, setCurrentType] = useState<Types>(types[0]);
  const [docHistory, setDocHistory] = useState<Types[]>([docRoot]);

  useEffect(() => {
    setCurrentType(docHistory[docHistory.length - 1]);
  }, [docHistory]);

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
      <h3 className={styles.title}>{currentType.name}</h3>
      {currentType.description && <p className={styles.description}>{currentType.description}</p>}
      {currentType.fields?.map((field) => (
        <div className={styles.field} key={field.name}>
          <span className={styles.name}>{field.name}</span>
          {!!field.args.length && (
            <div className={styles.args}>
              {field.args.map((arg) => (
                <div className={styles.arg} key={arg.name}>
                  <span className={styles.name}>{arg.name}</span>
                  <button className={styles.type} onClick={() => handleClick(arg.type || '')}>
                    : {arg.type}
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className={styles.type} onClick={() => handleClick(field.type || '')}>
            : {field.type}
          </button>
          {field.description && <p className={styles.description}>{field.description}</p>}
        </div>
      ))}
    </>
  );
};
